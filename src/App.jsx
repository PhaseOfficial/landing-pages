import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import { About } from './pages/About';
// import Contact from './pages/Contact';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
    <div className="p-4">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} />
            
           
        </Routes>
    </div>
</Router>
  )
}

export default App
