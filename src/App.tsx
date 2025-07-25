import { VirtualizedDataTable } from './components/Table/VirtualizedDataTable';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>React Structured Table</h1>
        <p>A dynamic user data table with sorting and column reordering</p>
      </header>
      
      <main className="app-main">
        <VirtualizedDataTable />
      </main>
    </div>
  );
}

export default App; 