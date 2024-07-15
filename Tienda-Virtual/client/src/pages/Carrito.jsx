import React from 'react';
import { useCarrito } from '../context/CarritoContext';

const Carrito = () => {
  const { carrito, eliminarProducto, vaciarCarrito } = useCarrito();

  return (
    <div className="contenedor">
      <h1>Carrito de Compras</h1>
      {carrito.length === 0 ? (
        <p>No hay productos en el carrito</p>
      ) : (
        <div>
          <ul>
            {carrito.map((producto, index) => (
              <li key={index}>
                {producto.nombre} - ${producto.precio}
                <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
              </li>
            ))}
          </ul>
          <button onClick={vaciarCarrito}>Vaciar Carrito</button>
        </div>
      )}
    </div>
  );
};

export default Carrito;
