import React from 'react';
import { Link } from 'react-router-dom'; // Importar Link desde react-router-dom
import '../styles/styles.css';

const Home = () => {
  return (
    <>
      <main className="contenedor">
        <h1>Nuestros Productos</h1>
        <div className="grid">
          {Array.from({ length: 14 }).map((_, index) => (
            <div className="producto" key={index}>
              <Link to="/producto">
                <img className="producto__imagen" src={`/assets/img/${index + 1}.jpg`} alt="imagen producto" />
                <div className="producto__informacion">
                  <p className="producto__nombre">Producto</p>
                  <p className="producto__precio">$$$$</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
