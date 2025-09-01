// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      <h1>Bienvenido a la Plataforma de Cursos</h1>
      <p>Explora, administra y crea cursos fácilmente.</p>
      <Link to="/courses" className="btn btn-primary">
        Ver Cursos
      </Link>
    </div>
  );
};

export default Home;
