// Importa el modelo de usuario, bcryptjs para el hashing de contraseñas, y createAccessToken para generar tokens JWT.
// Exporta funciones para manejar:
//   - 'register': Registra nuevos usuarios verificando la existencia del email, hasheando la contraseña y devolviendo un token de acceso.
//   - 'login': Autentica usuarios comparando contraseñas, devuelve un token de acceso si es exitoso.
//   - 'logout': Elimina la cookie de token para cerrar sesión.
//   - 'profile': Obtiene y devuelve el perfil del usuario autenticado.
// Maneja errores con respuestas de estado 400 para errores de usuario y 500 para errores internos.

import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';

export const register = async (req, res) => {
  const { email, password, username } = req.body;
  
  try {
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json({ message: "El Email ya está en uso" });

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });
    
    res.cookie("token", token);
    res.json({
      user: {
        id: userSaved._id,
        username: userSaved.username,
        email: userSaved.email,
        createdAt: userSaved.createdAt,
        updatedAt: userSaved.updatedAt,
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = await createAccessToken({ id: userFound._id });
    
    res.cookie("token", token);
    res.json({
      user: {
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0),
    });
    return res.sendStatus(200);
};

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)

    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado"});

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    })
}

export const updateProfile = async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    user.username = username || user.username;
    user.email = email || user.email;

    await user.save();

    res.json({ message: 'Perfil actualizado exitosamente' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};