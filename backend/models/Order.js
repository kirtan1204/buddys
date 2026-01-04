// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   items: [
//     {
//       name: String,
//       price: Number,
//       quantity: Number
//     }
//   ],
//   totalAmount: {
//     type: Number,
//     required: true
//   },
//   status: {
//     type: String,
//     default: 'Pending'
//   },
//   orderDate: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model('Order', orderSchema);


// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   items: [
//     {
//       name: String,
//       price: Number,
//       quantity: Number
//     }
//   ],
//   totalAmount: {
//     type: Number,
//     required: true
//   },
//   status: {
//     type: String,
//     default: 'Pending'
//   }
// }, { timestamps: true }); // ✅ ADD THIS LINE

// module.exports = mongoose.model('Order', orderSchema);


const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'Placed' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema, 'orders');
