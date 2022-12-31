import react from 'react';
import Index from "./views/Index";
import FourOfour from "./views/404"
import Dashboard from './views/Dashboard';
import ListingCreate from "./components/ListingCreate"
import { Routes, Route } from 'react-router-dom';
import Listing from './views/Listing';
import ListingUpdate from './components/ListingUpdate';
import ListingDelete from './components/ListingDelete';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Dashboard />} />
        
        
        <Route path="/listing" element={ <Listing />} >
          <Route path="create" element={<ListingCreate />} />
          <Route path="update/:_id" element={<ListingUpdate />} />
          <Route path="remove/:_id" element={<ListingDelete />} />
          
        </Route>
        
        <Route path="*" element={<FourOfour/>} />
        
      </Routes>
      
    </div>
  );
}

export default App;
