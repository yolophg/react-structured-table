import React, { useState, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';

import { useUsers } from '@/hooks/useUsers';
import { useSort } from '@/hooks/useSort';
import { DEFAULT_COLUMNS } from '@/constants/columns';
import { reorderColumns } from '@/utils/reorderColumns';
import { TableHeader } from './TableHeader';

export function VirtualizedDataTable() {
  const { users, loading } = useUsers();
  const { sortedData, sortState, handleSort } = useSort(users);
  const [columns, setColumns] = useState(DEFAULT_COLUMNS);
  const [showCopyToast, setShowCopyToast] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const parentRef = useRef<HTMLDivElement>(null);
  
  const rowVirtualizer = useVirtualizer({
    count: sortedData.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 5,
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const newColumns = reorderColumns(columns, String(active.id), String(over.id));
      setColumns(newColumns);
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setShowCopyToast(true);
      setTimeout(() => setShowCopyToast(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="data-table-container">
      {showCopyToast && (
        <div className="copy-toast">
          Copied ID to clipboard
        </div>
      )}
      
      <div className="table-info">
        <p>Showing {sortedData.length} users</p>
        {sortState.column && (
          <p>
            Sorted by {sortState.column} ({sortState.direction})
          </p>
        )}
      </div>

      {/* Virtualization Console */}
      <div className="virtualization-console">
        <h3>Virtualization Status</h3>
        <div className="console-stats">
          <span>Total Items: {sortedData.length}</span>
          <span>Rendered Items: {rowVirtualizer.getVirtualItems().length}</span>
          <span>
            Range: {rowVirtualizer.getVirtualItems()[0]?.index ?? 0} - {' '}
            {rowVirtualizer.getVirtualItems()[rowVirtualizer.getVirtualItems().length - 1]?.index ?? 0}
          </span>
        </div>
      </div>
      
      <div className="table-wrapper">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToHorizontalAxis]}
        >
          <div className="table-container">
            <div className="table-header-container">
              <div className="header-row">
                <SortableContext
                  items={columns.map((col) => col.id)}
                  strategy={horizontalListSortingStrategy}
                >
                  {columns.map((column) => (
                    <TableHeader
                      key={column.id}
                      column={column}
                      sortState={sortState}
                      onSort={handleSort}
                    />
                  ))}
                </SortableContext>
              </div>
            </div>

            <div
              ref={parentRef}
              className="virtual-table-container"
              style={{
                height: '400px',
                overflow: 'auto',
              }}
            >
              <div
                style={{
                  height: `${rowVirtualizer.getTotalSize()}px`,
                  width: '100%',
                  position: 'relative',
                }}
              >
                {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                  const user = sortedData[virtualRow.index];
                  return (
                    <div
                      key={user.id}
                      className="virtual-row"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: `${virtualRow.size}px`,
                        transform: `translateY(${virtualRow.start}px)`,
                        display: 'flex',
                        borderBottom: '1px solid #333',
                      }}
                    >
                      {columns.map((column) => {
                        const value = (user as any)[column.accessor];
                        const displayValue = formatCellValue(value, column);
                        
                        if (column.id === 'id') {
                          return (
                            <div 
                              key={`${user.id}-${column.id}`} 
                              className="virtual-cell"
                              title={`${displayValue} (Click to copy)`}
                            >
                              <span 
                                className="cell-text"
                                onClick={() => handleCopy(displayValue)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleCopy(displayValue);
                                  }
                                }}
                                tabIndex={0}
                                style={{ 
                                  cursor: 'pointer',
                                  padding: '2px 4px',
                                  borderRadius: '4px',
                                  transition: 'background-color 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = 'rgba(167, 139, 250, 0.1)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                }}
                              >
                                {displayValue}
                              </span>
                            </div>
                          );
                        }
                        
                        return (
                          <div 
                            key={`${user.id}-${column.id}`} 
                            className="virtual-cell"
                            title={displayValue}
                          >
                            <span className="cell-text">
                              {displayValue}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </DndContext>
      </div>
    </div>
  );
}

function formatCellValue(value: any, column: any): string {
  if (value instanceof Date) {
    return value.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
  
  if (column.id === 'dsr') {
    return `${value} days`;
  }
  
  return String(value || '');
} 