const bcrypt = require('bcryptjs');
const User = require('../models/User');

const registerUser = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;
    if (!name || !email || !password || !address) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, address, password: hashedPassword });
    await user.save();
    return res.status(201).json({ success: true, message: 'User registered successfully', user: { id: user._id, name: user.name, address: user.address, email: user.email, role: user.role } });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: 'Email and password are required' });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ success: false, message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ success: false, message: 'Invalid credentials' });

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { registerUser, loginUser };
