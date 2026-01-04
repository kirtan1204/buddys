const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  section: { type: String, required: true },
}, { timestamps: true });

// explicit collection name 'menu' to avoid pluralization mismatch
module.exports = mongoose.model('Menu', menuSchema, 'menu');
