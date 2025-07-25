import { renderHook, act } from '@testing-library/react';
import { useSort } from '../useSort';
import { UserWithComputedFields } from '@/types/User';

const mockUsers: UserWithComputedFields[] = [
  {
    id: '1',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice@test.com',
    city: 'New York',
    registeredDate: new Date(2022, 0, 1),
    fullName: 'Alice Johnson',
    dsr: 100,
  },
  {
    id: '2',
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'bob@test.com',
    city: 'Los Angeles',
    registeredDate: new Date(2023, 0, 1),
    fullName: 'Bob Smith',
    dsr: 50,
  },
];

describe('useSort', () => {
  it('should return unsorted data initially', () => {
    const { result } = renderHook(() => useSort(mockUsers));

    expect(result.current.sortedData).toEqual(mockUsers);
    expect(result.current.sortState.column).toBeNull();
    expect(result.current.sortState.direction).toBeNull();
  });

  it('should sort data in ascending order', () => {
    const { result } = renderHook(() => useSort(mockUsers));

    act(() => {
      result.current.handleSort('firstName');
    });

    expect(result.current.sortState.column).toBe('firstName');
    expect(result.current.sortState.direction).toBe('asc');
    expect(result.current.sortedData[0].firstName).toBe('Alice');
    expect(result.current.sortedData[1].firstName).toBe('Bob');
  });

  it('should sort data in descending order on second click', () => {
    const { result } = renderHook(() => useSort(mockUsers));

    act(() => {
      result.current.handleSort('firstName');
      result.current.handleSort('firstName');
    });

    expect(result.current.sortState.direction).toBe('desc');
    expect(result.current.sortedData[0].firstName).toBe('Bob');
    expect(result.current.sortedData[1].firstName).toBe('Alice');
  });

  it('should reset sort on third click', () => {
    const { result } = renderHook(() => useSort(mockUsers));

    act(() => {
      result.current.handleSort('firstName');
      result.current.handleSort('firstName');
      result.current.handleSort('firstName');
    });

    expect(result.current.sortState.column).toBeNull();
    expect(result.current.sortState.direction).toBeNull();
    expect(result.current.sortedData).toEqual(mockUsers);
  });

  it('should sort numbers correctly', () => {
    const { result } = renderHook(() => useSort(mockUsers));

    act(() => {
      result.current.handleSort('dsr');
    });

    expect(result.current.sortedData[0].dsr).toBe(50);
    expect(result.current.sortedData[1].dsr).toBe(100);
  });

  it('should sort dates correctly', () => {
    const { result } = renderHook(() => useSort(mockUsers));

    act(() => {
      result.current.handleSort('registeredDate');
    });

    expect(result.current.sortedData[0].registeredDate.getFullYear()).toBe(2022);
    expect(result.current.sortedData[1].registeredDate.getFullYear()).toBe(2023);
  });
}); 