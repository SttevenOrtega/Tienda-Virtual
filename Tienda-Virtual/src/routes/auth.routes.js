// Importa el módulo Router de Express para definir rutas de la aplicación.
// Importa funciones del controlador 'auth.controller.js' para manejar las operaciones de autenticación como login, register, logout, y profile.
// Importa la función 'authRequired' del middleware 'validateToken.js' para verificar la autenticación del usuario.
// Importa la función 'validateSchema' del middleware 'validator.middleware.js' para validar los datos de entrada utilizando esquemas definidos.
// Importa los esquemas 'registerSchema' y 'loginSchema' del archivo 'auth.schema.js' para validar los datos de registro y login, respectivamente.
// Crea una instancia de Router para definir y manejar las rutas relacionadas con la autenticación.
// Define las rutas y sus correspondientes manejadores:
//   - '/register' POST: Utiliza el middleware 'validateSchema' con 'registerSchema' para validar los datos de registro antes de llamar a 'register'.
//   - '/login' POST: Utiliza el middleware 'validateSchema' con 'loginSchema' para validar los datos de inicio de sesión antes de llamar a 'login'.
//   - '/logout' POST: Llama directamente a 'logout' para manejar la solicitud de cierre de sesión.
//   - '/profile' GET: Utiliza el middleware 'authRequired' para verificar la autenticación del usuario antes de llamar a 'profile'.
// Exporta el enrutador configurado para ser utilizado por la aplicación principal.

import {Router} from 'express';
import { login, register, logout, profile, updateProfile } from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import { createContact } from '../controllers/contactController.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router()

router.post("/register", validateSchema(registerSchema), register);

router.post("/login", validateSchema(loginSchema), login);

router.post("/logout", logout);

router.get('/profile', authRequired, profile);

router.put('/profile', authRequired, updateProfile);

router.post('/contact', createContact);

export default router;