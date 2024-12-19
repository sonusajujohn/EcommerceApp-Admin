import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/HomePage/Home'
import Welcome from './pages/WelcomePage/Welcome'
import Login from './pages/Login/Login'
import LoginPopup from './components/LandingPage/LoginPopup'
import RegistrationForm from './pages/Login/RegistrationForm'
import AdminDashboard from './pages/AdminDashboard/Admindashboard'
import ProductList from './components/Product Management/ProductList'
import AddProduct from './components/Product Management/Addproduct'
import OrderManagement from './components/Order Management/OrderManagement'
import UserList from './components/User Management/UserList'






const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/welcome' element={<Welcome/>}></Route>
        <Route path='/loginpopup' element={<LoginPopup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/registrationform' element={<RegistrationForm/>}></Route>
        <Route path='/admindashboard' element={<AdminDashboard/>}></Route>
        <Route path='/productlist' element={<ProductList/>}></Route>
        <Route path='/addproduct' element={<AddProduct/>}></Route>
        <Route path='/orders' element={<OrderManagement/>}></Route>
        <Route path='/users' element={<UserList/>}></Route>
      </Routes>
    </div>
  )
}

export default App
