import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contacto from "./pages/Contacto";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MisCompras from "./pages/MisCompras";
import Configuracion from "./pages/Configuracion";
import Carrito from "./pages/Carrito";
import Producto from "./pages/Producto";
import Nosotros from "./pages/Nosotros";
import Navegacion from "./components/Navegacion";
import Footer from "./components/Footer";
import { CarritoProvider } from "./context/CarritoContext";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";

const App = () => {
  return (
    <CarritoProvider>
      <Header />
      <Navegacion />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/producto" element={<Producto />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/miscompras" element={<PrivateRoute element={<MisCompras />} />} />
        <Route path="/configuracion" element={<PrivateRoute element={<Configuracion />} />} />
        <Route path="/carrito" element={<Carrito />} />
      </Routes>
      <Footer />
    </CarritoProvider>
  );
};

export default App;
