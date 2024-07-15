// src/controllers/cart.controller.js

import Cart from '../models/cart.model.js';
import Product from '../models/product.js'; // Importa el modelo de Producto

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    // Verificar si el producto existe
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ userId: req.user.id });
    if (cart) {
      const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
      cart = await cart.save();
    } else {
      cart = await Cart.create({ userId: req.user.id, items: [{ productId, quantity }] });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  const { productId } = req.body;
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (cart) {
      cart.items = cart.items.filter(item => !item.productId.equals(productId));
      await cart.save();
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndDelete({ userId: req.user.id });
    res.json({ message: 'Carrito vaciado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
