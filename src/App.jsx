import React from 'react'
import coursesdata from './data/courses.json'
import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from './Pages/Admin';


function App() {
  console.log(coursesdata.courses)
  return (
    <div style={{ fontFamily: "Nunito", fontWeight: 700 }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  )
}

export default App
