import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Componenet/Home';
import Navbar from './Componenet/Navbar';
import Register from './Componenet/Register';
import Login from './Componenet/Login';


function App() {
  return (
    <div>
        <Navbar/>
      <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/register' element={<Register/>}/>
      <Route exact path='/login'element={<Login/>}/>
      
      </Routes>
  
   
     
    </div>
  );
}

export default App;
