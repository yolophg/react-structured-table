import { renderHook, waitFor } from '@testing-library/react';
import { useUsers } from '../useUsers';

describe('useUsers', () => {
  it('should generate 500 users with computed fields', async () => {
    const { result } = renderHook(() => useUsers());

    expect(result.current.loading).toBe(true);
    expect(result.current.users).toHaveLength(0);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.users).toHaveLength(500);
    
    const user = result.current.users[0];
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('firstName');
    expect(user).toHaveProperty('lastName');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('city');
    expect(user).toHaveProperty('registeredDate');
    expect(user).toHaveProperty('fullName');
    expect(user).toHaveProperty('dsr');
    
    expect(user.fullName).toBe(`${user.firstName} ${user.lastName}`);
    expect(typeof user.dsr).toBe('number');
    expect(user.dsr).toBeGreaterThan(0);
  });

  it('should have valid email formats', async () => {
    const { result } = renderHook(() => useUsers());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    result.current.users.forEach(user => {
      expect(user.email).toMatch(emailRegex);
    });
  });
}); 