import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Form from './pages/Form';
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
