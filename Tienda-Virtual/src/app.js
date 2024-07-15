// Importa los módulos necesarios de Express y otros paquetes externos.
// Configura una aplicación Express para manejar solicitudes HTTP.
// Utiliza el middleware 'cors' para permitir solicitudes desde un origen específico ('http://localhost:5173').
// Utiliza 'morgan' en modo 'dev' para registrar solicitudes HTTP en la consola.
// Utiliza 'express.json()' para analizar solicitudes entrantes con formato JSON.
// Utiliza 'cookieParser' para analizar cookies de solicitudes entrantes.
// Define las rutas de autenticación importadas desde 'auth.routes.js' bajo el prefijo '/api'.
// Exporta la aplicación Express configurada para su uso en otros módulos.

import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import contactRoutes from './routes/auth.routes.js';
import authRoutes from './routes/auth.routes.js';
import cartRoutes from './routes/cart.routes.js';
import productRoutes from './routes/product.routes.js';
import orderRoutes from './routes/order.routes.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/api',authRoutes);
app.use('/api', cartRoutes);
app.use('/api', contactRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);

export default app;