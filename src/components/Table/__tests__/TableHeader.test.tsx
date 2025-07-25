import { render, screen, fireEvent } from '@testing-library/react';
import { TableHeader } from '../TableHeader';
import { DndContext } from '@dnd-kit/core';

const mockColumn = {
  id: 'firstName',
  header: 'First Name',
  accessor: 'firstName',
  sortable: true,
};

const mockSortState = {
  column: null,
  direction: null,
};

const MockWrapper = ({ children }: { children: React.ReactNode }) => (
  <DndContext onDragEnd={() => {}}>
    <table>
      <thead>
        <tr>{children}</tr>
      </thead>
    </table>
  </DndContext>
);

describe('TableHeader', () => {
  it('should render column header', () => {
    const mockOnSort = vi.fn();

    render(
      <MockWrapper>
        <TableHeader 
          column={mockColumn} 
          sortState={mockSortState} 
          onSort={mockOnSort} 
        />
      </MockWrapper>
    );

    expect(screen.getByText('First Name')).toBeInTheDocument();
    expect(screen.getByTitle('Sort by First Name')).toBeInTheDocument();
  });

  it('should call onSort when sort button is clicked', () => {
    const mockOnSort = vi.fn();

    render(
      <MockWrapper>
        <TableHeader 
          column={mockColumn} 
          sortState={mockSortState} 
          onSort={mockOnSort} 
        />
      </MockWrapper>
    );

    fireEvent.click(screen.getByTitle('Sort by First Name'));
    
    expect(mockOnSort).toHaveBeenCalledWith('firstName');
  });

  it('should show correct sort icon based on sort state', () => {
    const ascSortState = { column: 'firstName', direction: 'asc' as const };
    const mockOnSort = vi.fn();

    render(
      <MockWrapper>
        <TableHeader 
          column={mockColumn} 
          sortState={ascSortState} 
          onSort={mockOnSort} 
        />
      </MockWrapper>
    );

    expect(screen.getByText('↑')).toBeInTheDocument();
  });

  it('should show drag handle', () => {
    const mockOnSort = vi.fn();

    render(
      <MockWrapper>
        <TableHeader 
          column={mockColumn} 
          sortState={mockSortState} 
          onSort={mockOnSort} 
        />
      </MockWrapper>
    );

    expect(screen.getByTitle('Drag to reorder columns')).toBeInTheDocument();
  });
}); 