import { useState, useMemo } from 'react';
import { SortState, UserWithComputedFields } from '@/types/User';

function compareValues(a: any, b: any, direction: 'asc' | 'desc'): number {
  if (a == null && b == null) return 0;
  if (a == null) return direction === 'asc' ? -1 : 1;
  if (b == null) return direction === 'asc' ? 1 : -1;
  
  if (a instanceof Date && b instanceof Date) {
    const comparison = a.getTime() - b.getTime();
    return direction === 'asc' ? comparison : -comparison;
  }
  
  if (typeof a === 'string' && typeof b === 'string') {
    const dateA = new Date(a);
    const dateB = new Date(b);
    if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
      const comparison = dateA.getTime() - dateB.getTime();
      return direction === 'asc' ? comparison : -comparison;
    }
  }
  
  if (typeof a === 'number' && typeof b === 'number') {
    const comparison = a - b;
    return direction === 'asc' ? comparison : -comparison;
  }
  
  const aStr = String(a).toLowerCase();
  const bStr = String(b).toLowerCase();
  const comparison = aStr.localeCompare(bStr);
  return direction === 'asc' ? comparison : -comparison;
}

export function useSort(data: UserWithComputedFields[]) {
  const [sortState, setSortState] = useState<SortState>({
    column: null,
    direction: null,
  });

  const sortedData = useMemo(() => {
    if (!sortState.column || !sortState.direction || !data.length) {
      return data;
    }

    return [...data].sort((a, b) => {
      const aValue = (a as any)[sortState.column!];
      const bValue = (b as any)[sortState.column!];
      return compareValues(aValue, bValue, sortState.direction!);
    });
  }, [data, sortState]);

  const handleSort = (column: string) => {
    setSortState((prev) => {
      if (prev.column === column) {
        // Cycle: asc -> desc -> none
        switch (prev.direction) {
          case 'asc':
            return { column, direction: 'desc' };
          case 'desc':
            return { column: null, direction: null };
          default:
            return { column, direction: 'asc' };
        }
      } else {
        return { column, direction: 'asc' };
      }
    });
  };

  return {
    sortedData,
    sortState,
    handleSort,
  };
} 