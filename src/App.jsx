import { useState } from 'react'
import './App.css'
import Signup from './Components/signup'
import { createBrowserRouter, RouterProvider, BrowserRouter, Routes, Route } from 'react-router'
import Login from './Components/login'
import { Provider } from 'react-redux'
import store from './redux/store'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  return (
    <>
    <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />

      </Provider>
    </BrowserRouter>
    </>
  )
}

export default App
