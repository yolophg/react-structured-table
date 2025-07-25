import { reorderColumns } from '../reorderColumns';
import { ColumnDefinition } from '@/constants/columns';

const mockColumns: ColumnDefinition[] = [
  { id: 'id', header: 'ID', accessor: 'id', sortable: true },
  { id: 'name', header: 'Name', accessor: 'name', sortable: true },
  { id: 'email', header: 'Email', accessor: 'email', sortable: true },
];

describe('reorderColumns', () => {
  it('should reorder columns correctly', () => {
    const result = reorderColumns(mockColumns, 'id', 'email');
    
    expect(result[0].id).toBe('name');
    expect(result[1].id).toBe('email');
    expect(result[2].id).toBe('id');
  });

  it('should return original array if activeId not found', () => {
    const result = reorderColumns(mockColumns, 'notfound', 'email');
    
    expect(result).toEqual(mockColumns);
  });

  it('should return original array if overId not found', () => {
    const result = reorderColumns(mockColumns, 'id', 'notfound');
    
    expect(result).toEqual(mockColumns);
  });

  it('should handle same activeId and overId', () => {
    const result = reorderColumns(mockColumns, 'id', 'id');
    
    expect(result).toEqual(mockColumns);
  });
}); 