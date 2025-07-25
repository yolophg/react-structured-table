import { ColumnDefinition } from '@/constants/columns';

export function reorderColumns(
  columns: ColumnDefinition[],
  activeId: string,
  overId: string
): ColumnDefinition[] {
  const oldIndex = columns.findIndex((col) => col.id === activeId);
  const newIndex = columns.findIndex((col) => col.id === overId);

  if (oldIndex === -1 || newIndex === -1) {
    return columns;
  }

  const newColumns = [...columns];
  const [movedColumn] = newColumns.splice(oldIndex, 1);
  newColumns.splice(newIndex, 0, movedColumn);

  return newColumns;
} 