import react from 'react';
import Index from "./views/Index";
import FourOfour from "./views/404"
import Dashboard from './views/Dashboard';
import ListingCreate from "./components/ListingCreate"
import { Routes, Route } from 'react-router-dom';
import Listing from './views/Listing';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Dashboard />} />
        
        
        <Route path="/listing" element={ <Listing />} >
          <Route path="create" element={<ListingCreate />} />
          
        </Route>
        
        <Route path="*" element={<FourOfour/>} />
        
      </Routes>
      
    </div>
  );
}

export default App;
