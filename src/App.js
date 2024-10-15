import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Form from './pages/Form';
 
const App = () => {
   return (
      <>
        <h1>Coolstays Coding Task</h1>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:type" element={<Form />} />
         </Routes>
      </>
   );
}


export default App;
