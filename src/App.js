import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import Planning from './pages/Planning';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            //* Add The Paths Here *//
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
