export interface ColumnDefinition {
  id: string;
  header: string;
  accessor: string;
  sortable: boolean;
  computed?: boolean;
}

export const DEFAULT_COLUMNS: ColumnDefinition[] = [
  {
    id: 'id',
    header: 'ID',
    accessor: 'id',
    sortable: true,
  },
  {
    id: 'firstName',
    header: 'First Name',
    accessor: 'firstName',
    sortable: true,
  },
  {
    id: 'lastName',
    header: 'Last Name',
    accessor: 'lastName',
    sortable: true,
  },
  {
    id: 'fullName',
    header: 'Full Name',
    accessor: 'fullName',
    sortable: true,
    computed: true,
  },
  {
    id: 'email',
    header: 'Email',
    accessor: 'email',
    sortable: true,
  },
  {
    id: 'city',
    header: 'City',
    accessor: 'city',
    sortable: true,
  },
  {
    id: 'registeredDate',
    header: 'Registered Date',
    accessor: 'registeredDate',
    sortable: true,
  },
  {
    id: 'dsr',
    header: 'DSR',
    accessor: 'dsr',
    sortable: true,
    computed: true,
  },
]; 