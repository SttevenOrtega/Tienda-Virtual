import React from "react";
import { Link } from "react-router-dom";
import "../styles/styles.css";

const Producto = () => {
  return (
    <>
      <main className="contenedor">
        <h1>Producto</h1>
        <div className="camisa">
          <img className="camisa__imagen" src="/assets/img/3.jpg" alt="Imagen del Producto" />
          <div className="camisa__contenido">
            <p>Descripción del producto...</p>
            <form className="formulario">
              <select className="formulario__campo" defaultValue="">
                <option value="" disabled>-- Seleccionar Talla --</option>
                <option value="pequeña">Pequeña</option>
                <option value="mediana">Mediana</option>
                <option value="grande">Grande</option>
              </select>
              <input className="formulario__campo" type="number" placeholder="Cantidad" min="1" />
              <Link className="formulario__submit" to="/envio">Comprar Ahora</Link>
              <input className="formulario__submit" type="submit" value="Agregar al Carrito" />
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Producto;
