import { calculateDSR } from '../calculateDSR';

describe('calculateDSR', () => {
  it('should calculate days since registration correctly', () => {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const dsr = calculateDSR(sevenDaysAgo);
    
    expect(dsr).toBe(7);
  });

  it('should handle today registration', () => {
    const today = new Date();
    const dsr = calculateDSR(today);
    
    expect(dsr).toBe(1);
  });

  it('should handle future dates', () => {
    const future = new Date();
    future.setDate(future.getDate() + 5);
    
    const dsr = calculateDSR(future);
    
    expect(dsr).toBe(1);
  });
}); 