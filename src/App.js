import react from 'react';
import Index from "./views/Index";
import Dashboard from './views/Dashboard';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Dashboard />} />
      </Routes>
      
    </div>
  );
}

export default App;
