export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  registeredDate: Date;
}

export interface UserWithComputedFields extends User {
  fullName: string;
  dsr: number;
}

export type SortDirection = 'asc' | 'desc' | null;

export interface SortState {
  column: string | null;
  direction: SortDirection;
} 