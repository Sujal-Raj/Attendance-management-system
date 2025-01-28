import React from 'react'
import { Routes, Route } from "react-router-dom";
import Homepage from '../Components/Homepage';
import Login from '../Components/Login';
import Register from '../Components/Register';
import AdminDashboard from '../Pages/AdminDashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/admindashboard" element={<AdminDashboard/>}/>
    </Routes>
  )
}

export default App