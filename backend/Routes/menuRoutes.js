const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Menu = require('../models/Menu'); 

// 🔄 GET all menu items
router.get('/', async (req, res) => {
  try {
    const items = await Menu.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching menu items', error: err });
  }
});

// ➕ POST a new menu item
router.post('/', async (req, res) => {
  const { name, price, section } = req.body;
  if (!name || !price || !section) {
    return res.status(400).json({ message: 'Name, Price, and Section are required' });
  }

  try {
    const newItem = new Menu({ name, price, section });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: 'Error saving item', error: err });
  }
});

// ❌ DELETE a menu item by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid item ID' });
  }

  try {
    const deleted = await Menu.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting item', error: err });
  }
});

module.exports = router;
