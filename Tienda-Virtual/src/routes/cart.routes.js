// src/routes/cart.routes.js

import { Router } from 'express';
import { getCart, addToCart, removeFromCart, clearCart } from '../controllers/cart.controller.js';
import { authRequired } from '../middlewares/validateToken.js'; // Asegúrate de importar el middleware de autenticación

const router = Router();

router.get('/cart', authRequired, getCart);
router.post('/cart/add', authRequired, addToCart);
router.post('/cart/remove', authRequired, removeFromCart);
router.post('/cart/clear', authRequired, clearCart);

export default router;
