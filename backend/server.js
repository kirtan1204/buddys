const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
console.log("Loaded MONGO_URI:", process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected Successfully'))
.catch((err) => console.error('❌ MongoDB Connection Error:', err));

// ✅ Routes
const userRoutes = require('./routes/userRoutes');
const menuRoutes = require('./routes/menuRoutes'); // If needed

app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/users', userRoutes);
app.use('/api/menu', menuRoutes); // Add if you manage menu

// ✅ Root Health Check (Optional)
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


// ✅ Load environment variables FIRST
// require('dotenv').config();

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// // ✅ Create Express App
// const app = express();
// const PORT = process.env.PORT || 5000;

// // ✅ Middleware
// app.use(cors({
//   origin: process.env.CLIENT_URL || 'http://localhost:3000',
//   credentials: true,
// }));
// app.use(express.json());

// // ✅ Debug Mongo URI (optional during testing)
// if (!process.env.MONGO_URI) {
//   console.error("❌ ERROR: MONGO_URI not found in .env file!");
//   process.exit(1); // Stop server if no Mongo URI found
// }

// // ✅ MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('✅ MongoDB Connected Successfully'))
//   .catch((err) => {
//     console.error('❌ MongoDB Connection Error:', err);
//     process.exit(1); // Stop if DB connection fails
//   });

// // ✅ Routes
// const userRoutes = require('./routes/userRoutes');
// const menuRoutes = require('./routes/menuRoutes');
// const orderRoutes = require('./routes/orderRoutes');

// app.use('/api/users', userRoutes);
// app.use('/api/menu', menuRoutes);
// app.use('/api/orders', orderRoutes);

// // ✅ Health Check Route
// app.get('/', (req, res) => {
//   res.send('🚀 Server is running and connected to MongoDB');
// });

// // ✅ Start Server
// app.listen(PORT, () => {
//   console.log(`🌍 Server running at http://localhost:${PORT}`);
// });
