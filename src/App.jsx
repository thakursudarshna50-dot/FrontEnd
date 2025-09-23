import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './Components/signup'
import { createBrowserRouter, RouterProvider, BrowserRouter, Routes, Route } from 'react-router'
import Login from './Components/login'
function App() {
  const [count, setCount] = useState(0)

  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Login />,
  //     children:[
  //       {
  //         path: "/",
  //         element: <Login />,
  //       },
  //       {
  //         path: "/signup",
  //         element: <Signup />,
  //       },
  //     ]
  //   },
  //   {
  //     path: "/signup",
  //     element: <Signup />,
  //   },
  // ])

  return (
    <>
    {/* <RouterProvider router={router} /> */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
