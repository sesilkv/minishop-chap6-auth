import React, { useEffect } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './Layout/Layout'
import Product from './Page/Product'
import ProductDetail from './Page/ProductDetail'
import ShoppingCart from './Page/ShoppingCart'
import Login from './Page/Login'
import Register from './Page/Register'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import userSlice from './Store/user'
import ProtectedRoute from './Component/HOC/ProtectedRoute'
import UnprotectedRoute from './Component/HOC/UnprotectedRoute'
import Logout from './Page/Logout'

function App() {

  const dispatch = useDispatch()

  useEffect( () => {
    try {
      const token = localStorage.getItem('minishopAccessToken')
      const userData= jwtDecode(token)
      axios.get(`http://localhost:4000/users/${userData.sub}`)
      .then( res => {
        dispatch(userSlice.actions.addUser({userData: res.data}))
      })}
    catch {}
  }, [])

  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* ALL */}
          <Route index element={<h1>Home</h1>}/>
          <Route path="products/">
            <Route index element={<Product />} />
            <Route path=":id" element={<ProductDetail />}/>
          </Route>
          <Route path="categories" element={<h1>Categories</h1>} />
          <Route path="shopping-cart" element={<ShoppingCart />} />
          <Route path="logout" element={<Logout />} />
          
          {/* PUBLIC ONLY */}
          <Route path="/" element={<UnprotectedRoute />}>
            {/* form-based pake react-hook-form untuk login and regis */}
            <Route path="register" element={<Register />}/>
            <Route path="login" element={<Login />} />
          </Route>

          {/* PROTECTED */}
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="order-history" element={<h1>Order History</h1>}/>
          </Route>
          {/* <Route path="products" element={<Product />} /> */}
        </Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
