import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './Layout/Layout'
import Product from './Page/Product'
import ProductDetail from './Page/ProductDetail'
import ShoppingCart from './Page/ShoppingCart'
import Login from './Page/Login'
import Register from './Page/Register'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<h1>Home</h1>}/>
          {/* form-based pake react-hook-form untuk login and regis */}
          <Route path="register" element={<Register />}/>
          <Route path="login" element={<Login />} />
          <Route path="products/">
            <Route index element={<Product />} />
            <Route path=":id" element={<ProductDetail />}/>
          </Route>

          {/* <Route path="products" element={<Product />} /> */}
          <Route path="categories" element={<h1>Categories</h1>} />
          <Route path="shopping-cart" element={<ShoppingCart />} />
          <Route path="order-history" element={<h1>Order History</h1>} />
        </Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
