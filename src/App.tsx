import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Courses from './pages/Courses';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Menú o Navbar */}
        <nav>
          <a href="/">Inicio</a>
          <a href="/courses">Cursos</a>
        </nav>

        {/* Rutas */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;