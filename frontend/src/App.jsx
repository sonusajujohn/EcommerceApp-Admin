import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/HomePage/Home'
import AdminDashboard from './pages/AdminDashboard/Admindashboard'
import RegistrationForm from './pages/Login/RegistrationForm'
import Welcome from './pages/WelcomePage/Welcome'
import Login from './pages/Login/Login'
import ProductList from './components/Product Management/Productlist'
import AddProduct from './components/Product Management/Addproduct'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/welcome' element={<Welcome/>}></Route>
        <Route path='/registrationform' element={<RegistrationForm/>}></Route>
        <Route path='/admindashboard' element={<AdminDashboard/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/productlist' element={<ProductList/>}></Route>
        <Route path='/addproduct' element={<AddProduct/>}></Route>
      </Routes>
    </div>
  )
}

export default App
