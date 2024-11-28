import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/HomePage/Home'
import AdminDashboard from './pages/AdminDashboard/Admindashboard'
import RegistrationForm from './pages/Login/Registrationform'
import Welcome from './pages/WelcomePage/Welcome'



const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/welcome' element={<Welcome/>}></Route>
        <Route path='/registrationform' element={<RegistrationForm/>}></Route>
        <Route path='/admindashboard' element={<AdminDashboard/>}></Route>
      </Routes>
    </div>
  )
}

export default App
