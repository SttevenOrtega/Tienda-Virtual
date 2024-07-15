import React, { createContext, useState, useContext } from 'react';

const CarritoContext = createContext();

export const useCarrito = () => {
    return useContext(CarritoContext);
};

export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);

    const agregarProducto = (producto) => {
        setCarrito((prevCarrito) => [...prevCarrito, producto]);
    };

    const eliminarProducto = (productoId) => {
        setCarrito((prevCarrito) => prevCarrito.filter((producto) => producto.id !== productoId));
    };

    const vaciarCarrito = () => {
        setCarrito([]);
    };

    return (
        <CarritoContext.Provider value={{ carrito, agregarProducto, eliminarProducto, vaciarCarrito }}>
            {children}
        </CarritoContext.Provider>
    );
};
