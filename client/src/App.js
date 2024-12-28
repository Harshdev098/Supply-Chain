import './App.css';
import {Route,Routes,BrowserRouter} from 'react-router-dom'
import React from 'react';
import Landing from './Pages/Landing';
import Login from './Pages/Login';
import Main from './Pages/Main';
import Verify from './Components/Verify';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/main/:id' element={<Main />} />
          <Route path='/verify' element={<Verify />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
