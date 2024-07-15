import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/styles.css';
import '../styles/normalize.css';
import { FaShoppingCart } from 'react-icons/fa';
import { useCarrito } from '../context/CarritoContext';

const Navegacion = () => {
  const location = useLocation();
  const { user, isAuthenticated, signout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const { carrito } = useCarrito();

  const isActive = (paths) => paths.includes(location.pathname);

  const handleMouseEnter = () => setShowDropdown(true);
  const handleMouseLeave = () => setShowDropdown(false);

  const toggleCart = () => setShowCart(!showCart);

  return (
    <nav className="navegacion">
      <div className="navegacion__contenedor">
        <div className="navegacion__izquierda">
          <Link className={`navegacion__enlace ${isActive(['/']) ? 'navegacion__enlace--activo' : ''}`} to="/">Tienda</Link>
          <Link className={`navegacion__enlace ${isActive(['/nosotros']) ? 'navegacion__enlace--activo' : ''}`} to="/nosotros">Nosotros</Link>
          <Link className={`navegacion__enlace ${isActive(['/contacto']) ? 'navegacion__enlace--activo' : ''}`} to="/contacto">Contacto</Link>
        </div>
        <div className="navegacion__derecha">
          <div className="navegacion__carrito" onClick={toggleCart}>
            <FaShoppingCart className="navegacion__carrito-icon" />
            {carrito.length > 0 && <span className="navegacion__carrito-count">{carrito.length}</span>}
            {showCart && (
              <div className="navegacion__carrito-dropdown">
                {carrito.length > 0 ? (
                  <div>
                    {carrito.map((item, index) => (
                      <div key={index} className="carrito-item">
                        <span>{item.name}</span>
                        <span>{item.quantity}</span>
                      </div>
                    ))}
                    <button className="comprar-button">Comprar</button>
                  </div>
                ) : (
                  <div className="carrito-vacio">El carrito está vacío</div>
                )}
              </div>
            )}
          </div>
          {isAuthenticated ? (
            <div className="navegacion__usuario" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <span className="navegacion__enlace navegacion__enlace--activo">{user?.username || 'Cargando...'}</span>
              {showDropdown && (
                <div className="navegacion__dropdown">
                  <Link className="navegacion__dropdown-enlace" to="/MisCompras">Mis compras</Link>
                  <Link className="navegacion__dropdown-enlace" to="/Configuracion">Configuración</Link>
                  <button className="navegacion__dropdown-enlace" onClick={signout}>Cerrar sesión</button>
                </div>
              )}
            </div>
          ) : (
            <Link className={`navegacion__enlace ${isActive(['/login', '/register']) ? 'navegacion__enlace--activo' : ''}`} to="/login">Iniciar Sesión</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navegacion;
