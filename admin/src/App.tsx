import React from 'react';
import {BrowserRouter, Routes , Route} from 'react-router-dom'
import AddBus from './Pages/AddBus/AddBus';
import Bus from './Pages/Bus/Bus';
import BusDetails from './Pages/BusDetails/BusDetails';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Users from './Pages/Users/Users';

function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/bus' element={<Bus/>}/>
        <Route path='/bus/:busid' element={<BusDetails/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/users' element={<Users/>}/>
        <Route path='/bus/add' element={<AddBus/>}/>
      </Routes>
    </BrowserRouter>
  </>
}

export default App;
