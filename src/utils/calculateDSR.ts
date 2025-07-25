export function calculateDSR(registeredDate: Date): number {
  const now = new Date();
  const diffTime = now.getTime() - registeredDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return Math.max(1, diffDays);
} 