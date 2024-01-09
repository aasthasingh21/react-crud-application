"use client"

import './App.css';
import Create from './Components/Create';
import Navbar from './Components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Read from './Components/Read';
import Update from './Components/Update';


function App() {
  return (
    <div className='App'>

      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route exact path='/' element={<Create/>} />
          <Route exact path='/read' element={<Read/>} />
          <Route exact path='/edit/:id' element={<Update/>} />
        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
