// controllers/order.controller.js
import Order from '../models/order.model.js';
import Cart from '../models/cart.model.js';

export const createOrder = async (req, res) => {
  const { shippingInfo, paymentMethod } = req.body;
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
    if (!cart) {
      return res.status(400).json({ message: 'Cart not found' });
    }

    // Validar que todos los productos tengan un precio válido
    const invalidItems = cart.items.filter(item => !item.productId || !item.productId.price);
    if (invalidItems.length > 0) {
      return res.status(400).json({ message: 'Some products in the cart are invalid' });
    }

    const totalAmount = cart.items.reduce((acc, item) => acc + item.productId.price * item.quantity, 0);

    const newOrder = new Order({
      userId: req.user.id,
      items: cart.items.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity
      })),
      shippingInfo,
      paymentMethod,
      totalAmount
    });

    const savedOrder = await newOrder.save();

    await Cart.findOneAndDelete({ userId: req.user.id });

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.productId');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate('items.productId');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
