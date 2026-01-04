// const express = require('express');
// const router = express.Router();
// const Order = require('../models/Order');

// // POST: Create new order
// router.post('/', async (req, res) => {
//   try {
//     const { userId, userEmail, items, totalAmount } = req.body;

//     if (!userId || !items || !userEmail) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     const newOrder = new Order({ userId, userEmail, items, totalAmount });
//     await newOrder.save();

//     res.status(201).json({ success: true, message: 'Order placed successfully!' });
//   } catch (err) {
//     console.error('Order saving error:', err);
//     res.status(500).json({ message: 'Failed to save order' });
//   }
// });

// // GET: All orders
// router.get('/', async (req, res) => {
//   try {
//     const orders = await Order.find().sort({ date: -1 });
//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// POST: Create new order
router.post('/', async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;

    if (!userId || !items) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newOrder = new Order({ userId, items, totalAmount });
    await newOrder.save();

    res.status(201).json({ success: true, message: 'Order placed successfully!' });
  } catch (err) {
    console.error('Order saving error:', err);
    res.status(500).json({ message: 'Failed to save order' });
  }
});
// GET: All orders with user info
router.get('/', async (req, res) => {
    try {
      const orders = await Order.find()
        .sort({ createdAt: -1 })
        .populate('userId', 'name email'); // 👈 Populate only name and email
  
      res.status(200).json(orders);
    } catch (err) {
      console.error('Order fetching error:', err);
      res.status(500).json({ message: err.message });
    }
  });
  
module.exports = router;
