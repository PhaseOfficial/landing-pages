import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
// import Contact from './pages/Contact';

function App() {
  return (
    <Router>
    <div className="p-4">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Services" element={<Services />} />
            
           
        </Routes>
    </div>
</Router>
  )
}

export default App