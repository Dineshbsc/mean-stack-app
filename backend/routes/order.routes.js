const express = require('express');
const router = express.Router();
const Order = require('../models/order.model');

// CREATE ORDER
router.post('/', async (req, res) => {
  try {
    const { userId, productIds, totalAmount } = req.body;

    if (!userId || !productIds?.length || !totalAmount) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const order = await Order.create({
      userId,
      productIds,
      totalAmount
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET ORDER BY ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order)
      return res.status(404).json({ message: 'Order not found' });

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Invalid order ID' });
  }
});

// UPDATE ORDER
router.put('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!order)
      return res.status(404).json({ message: 'Order not found' });

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE ORDER
router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order)
      return res.status(404).json({ message: 'Order not found' });

    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
