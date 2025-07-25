import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { VirtualizedDataTable } from '../VirtualizedDataTable';

const mockUseUsers = vi.fn();
vi.mock('@/hooks/useUsers', () => ({
  useUsers: () => mockUseUsers(),
}));

vi.mock('@/hooks/useSort', () => ({
  useSort: (data: any) => ({
    sortedData: data,
    sortState: { column: null, direction: null },
    handleSort: vi.fn(),
  }),
}));

vi.mock('@tanstack/react-virtual', () => ({
  useVirtualizer: () => ({
    getVirtualItems: () => [
      { index: 0, start: 0, size: 50 },
    ],
    getTotalSize: () => 50,
  }),
}));

describe('VirtualizedDataTable', () => {
  beforeEach(() => {
    mockUseUsers.mockReturnValue({
      users: [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@test.com',
          city: 'New York',
          registeredDate: new Date('2023-01-01'),
          fullName: 'John Doe',
          dsr: 365,
        },
      ],
      loading: false,
    });
  });

  it('should render table with data', async () => {
    render(<VirtualizedDataTable />);

    await waitFor(() => {
      expect(screen.getByText('Showing 1 users')).toBeInTheDocument();
    });

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@test.com')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
  });

  it('should show loading state', () => {
    mockUseUsers.mockReturnValue({
      users: [],
      loading: true,
    });

    render(<VirtualizedDataTable />);
    
    expect(screen.getByText('Loading users...')).toBeInTheDocument();
  });

  it('should render all column headers', async () => {
    render(<VirtualizedDataTable />);

    await waitFor(() => {
      expect(screen.getByText('ID')).toBeInTheDocument();
      expect(screen.getByText('First Name')).toBeInTheDocument();
      expect(screen.getByText('Last Name')).toBeInTheDocument();
      expect(screen.getByText('Full Name')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('City')).toBeInTheDocument();
      expect(screen.getByText('Registered Date')).toBeInTheDocument();
      expect(screen.getByText('DSR')).toBeInTheDocument();
    });
  });
}); 