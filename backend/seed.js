// seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Menu = require('./models/Menu');
const User = require('./models/User');
const Order = require('./models/Order');

async function run() {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  console.log('Connected for seeding, DB:', mongoose.connection.db.databaseName);

  // Clear existing (careful in production)
  await Menu.deleteMany({});
  await User.deleteMany({});
  await Order.deleteMany({});

  // Users
  const user = await User.create({
    name: 'Demo User',
    email: 'demo@example.com',
    password: 'hashed_password_placeholder',
    address: 'Demo Address'
  });

  // Menu
  const menuItems = await Menu.insertMany([
    { name: 'Vadapav', price: 30, section: 'Vadapav' },
    { name: 'Masala Sandwich', price: 60, section: 'Sandwich' },
    { name: 'Cold Coffee', price: 80, section: 'Drinks' }
  ]);

  // Orders
  await Order.create({
    userId: user._id,
    items: [
      { name: menuItems[0].name, price: menuItems[0].price, quantity: 2 },
      { name: menuItems[2].name, price: menuItems[2].price, quantity: 1 }
    ],
    totalAmount: menuItems[0].price * 2 + menuItems[2].price,
    status: 'Placed'
  });

  console.log('Seeding done.');
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
