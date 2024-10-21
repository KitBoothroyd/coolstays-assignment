import './App.css';
import { Routes, Route } from 'react-router-dom';
import Form from './pages/Home';
import React from 'react';
 
const App = () => {
   return (
      <div className="App">
         <Routes>
            <Route path="/" element={<Form />} />
         </Routes>
      </div>
   );
}

export default App;
