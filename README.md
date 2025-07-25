# React Structured Table

A dynamic user data table implementing sorting, column reordering, and virtualization for optimal performance with large datasets.

## Features

- **500+ user records** generated with Faker.js
- **Column sorting** - Click any column header to sort
- **Drag & drop reordering** - Drag column headers to reorder
- **Virtualization** - Renders only visible rows for performance
- **ID copy functionality** - Click ID cells to copy to clipboard
- **Virtualization debugging** - Real time visualization console showing render metrics
- **Computed fields** - Full Name and Days Since Registered (DSR)
- **Responsive design** - Horizontal scrolling on smaller screens

## Quick Start

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── components/Table/
│   ├── VirtualizedDataTable.tsx    # Main table component with virtualization
│   └── TableHeader.tsx             # Header with drag/sort functionality
├── hooks/
│   ├── useUsers.ts                 # Data generation and management
│   └── useSort.ts                  # Sorting logic and state
├── constants/
│   └── columns.ts                  # Column definitions
├── utils/
│   ├── calculateDSR.ts             # Days since registered calculation
│   └── reorderColumns.ts           # Column reordering logic
├── types/
│   └── User.ts                     # TypeScript interfaces
└── __tests__/                      # Test files
```

## Architecture

### Data Layer

- **useUsers**: Generates 500 fake users with Faker.js, adds computed fields (fullName, dsr)
- **Types**: Clean separation between persisted data (User) and computed data (UserWithComputedFields)

### Component Layer

- **VirtualizedDataTable**: Main component integrating virtualization, sorting, and drag-and-drop
- **TableHeader**: Reusable header component handling both drag handles and sort buttons

### State Management

- **useSort**: Three-state sorting (asc/desc/none) with type-specific comparison
- **Local state**: Column order maintained in main component

### Performance

- **@tanstack/react-virtual**: Renders only visible rows (~10-15 out of 500)
- **Optimized renders**: Memoization and efficient state updates
- **Smart column widths**: Flex-based auto-sizing with minimum widths

## Key Technical Decisions

### Virtualization Strategy

Uses row-based virtualization rather than infinite scroll because:

- All data is available locally (500 records)
- Provides immediate access to full dataset for sorting
- Simpler state management than pagination

### Computed Fields Implementation

- **Full Name**: Calculated at render time, not persisted
- **DSR**: Real-time calculation from registration date
- Both fields are sortable and participate in all table operations

### Drag & Drop Integration

- Separates drag handles from sort buttons to prevent conflicts
- Maintains column order state independently from data
- Preserves functionality during reordering

## Infinite Scroll Considerations

Current implementation uses virtualization with all data loaded. For infinite scroll:

1. **Data Loading**: Replace static 500 records with paginated API calls
2. **State Management**: Track loading states, page boundaries, and cached data
3. **Virtualization**: Integrate with loading triggers at scroll boundaries
4. **Sorting**: Server-side sorting or windowed sorting for large datasets

The current architecture supports this transition:

- Data fetching is isolated in `useUsers` hook
- Sorting logic can be extended for server-side operations
- Component interface remains unchanged

## Testing

```bash
npm test          # Run all tests
```

Test coverage includes:

- Hook functionality (data generation, sorting)
- Component rendering and interactions
- Utility functions

## Tech Stack

- **React 18** + **TypeScript**
- **@tanstack/react-virtual** - Virtualization
- **@dnd-kit** - Drag and drop
- **@faker-js/faker** - Test data generation
- **Vite** - Build tool
- **Vitest** + **Testing Library** - Testing

## Development Notes

The codebase prioritizes:

- **Clean separation of concerns** between data, state, and UI
- **Type safety** throughout the application
- **Performance** through virtualization and optimized renders
- **Maintainability** with clear component boundaries and reusable hooks
