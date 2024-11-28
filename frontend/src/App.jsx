import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/HomePage/Home'
import Login from './pages/Login/Login'
import AdminDashboard from './pages/AdminDashboard/Admindashboard'
import RegistrationForm from './pages/Login/Registrationform'



const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/registrationform' element={<RegistrationForm/>}></Route>
        <Route path='/admindashboard' element={<AdminDashboard/>}></Route>
      </Routes>
    </div>
  )
}

export default App
