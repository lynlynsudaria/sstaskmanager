import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Access from './pages/Access';
import Newtask from './pages/Newtask';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        {/* <div className="nav-links">
          <NavLink className="nav-link" exact activeClassName="active" to="/"></NavLink>
          <NavLink className="nav-link" activeClassName="active" to="/About"></NavLink>
          <NavLink className="nav-link" activeClassName="active" to="/Access"></NavLink>
        </div> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Access" element={<Access />} />
          <Route path="/Newtask" element={<Newtask />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
