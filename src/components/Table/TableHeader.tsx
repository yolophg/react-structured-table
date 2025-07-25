import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ColumnDefinition } from '@/constants/columns';
import { SortState } from '@/types/User';

interface TableHeaderProps {
  column: ColumnDefinition;
  sortState: SortState;
  onSort: (columnId: string) => void;
}

export function TableHeader({ column, sortState, onSort }: TableHeaderProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getSortIcon = () => {
    if (sortState.column !== column.id) return '⇅';
    if (sortState.direction === 'asc') return '↑';
    if (sortState.direction === 'desc') return '↓';
    return '⇅';
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="table-header"
    >
      <div className="header-content">
        <div 
          className="drag-handle"
          {...attributes}
          {...listeners}
          title="Drag to reorder columns"
        >
          ⋮⋮
        </div>
        
        <span className="header-text" title={column.header}>
          {column.header}
        </span>
        
        {column.sortable && (
          <button
            className="sort-button"
            onClick={() => onSort(column.id)}
            title={`Sort by ${column.header}`}
            type="button"
          >
            {getSortIcon()}
          </button>
        )}
      </div>
    </div>
  );
} 