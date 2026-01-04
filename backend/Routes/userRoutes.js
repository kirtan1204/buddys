const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); 
const User = require('../models/User');
const { registerUser, loginUser } = require('../controllers/userController');

// ------------------- ADD THIS -------------------
const nodemailer = require("nodemailer");

// Configure mail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sd22.kpp@gmail.com",
    pass: "cumnhksdyutwkoas"
  }
});
// ------------------------------------------------

// POST: Register
router.post('/register', registerUser);

// POST: Login
router.post('/login', loginUser);

// ------------------- FORGOT PASSWORD START -------------------

router.post('/forgot-password', async (req, res) => {
  console.log("🔵 ROUTE HIT: /forgot-password");

  try {
    const { email } = req.body;
    console.log("➡️ Email received:", email);

    const user = await User.findOne({ email });
    console.log("➡️ User found:", user ? "YES" : "NO");

    if (!user) {
      console.log("❌ No user found");
      return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log("➡️ Generated OTP:", otp);

    user.resetOtp = otp;
    user.otpExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    console.log("📨 Trying to send mail...");

    const mailResponse = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}`,
    });

    console.log("✅ Mail response:", mailResponse);
    return res.json({ message: "OTP sent successfully!" });

  } catch (error) {
    console.log("❌ ERROR in /forgot-password:", error);
    return res.status(500).json({ message: "Failed to send OTP", error: error.message });
  }
});

router.post('/verify-otp', async (req, res) => {
  console.log("🔵 ROUTE HIT: /verify-otp");
  
  try {
    const { email, otp } = req.body;
    console.log("➡️ Email:", email, "OTP:", otp);

    const user = await User.findOne({ email });
    console.log("➡️ User found:", user ? "YES" : "NO");

    if (!user) {
      console.log("❌ User not found");
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    console.log("➡️ Stored OTP:", user.resetOtp, "Type:", typeof user.resetOtp);
    console.log("➡️ Received OTP:", otp, "Type:", typeof otp);
    console.log("➡️ OTP Expires:", user.otpExpire);
    console.log("➡️ Current time:", Date.now());
    console.log("➡️ Is OTP expired?", Date.now() > user.otpExpire);

    // Convert both to string for comparison to avoid type issues
    if (user.resetOtp?.toString() !== otp?.toString()) {
      console.log("❌ OTP mismatch");
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (Date.now() > user.otpExpire) {
      console.log("❌ OTP expired");
      return res.status(400).json({ message: "OTP has expired" });
    }

    console.log("✅ OTP verified successfully");
    res.json({ message: "OTP verified!" });

  } catch (error) {
    console.log("❌ ERROR in /verify-otp:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post('/reset-password', async (req, res) => {
  console.log("🔵 ROUTE HIT: /reset-password");
  
  try {
    const { email, otp, newPassword } = req.body; // Changed from 'password' to 'newPassword'
    console.log("➡️ Email:", email, "OTP:", otp);

    if (!newPassword) {
      return res.status(400).json({ message: "New password is required" });
    }

    const user = await User.findOne({ email });
    console.log("➡️ User found:", user ? "YES" : "NO");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Verify OTP again before allowing password reset
    if (user.resetOtp?.toString() !== otp?.toString()) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (Date.now() > user.otpExpire) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    // Hash and update the password
    user.password = await bcrypt.hash(newPassword, 10);

    // Clear OTP fields
    user.resetOtp = null;
    user.otpExpire = null;

    await user.save();

    console.log("✅ Password reset successfully");
    res.json({ message: "Password reset successful!" });

  } catch (error) {
    console.log("❌ ERROR in /reset-password:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ------------------- FORGOT PASSWORD END -------------------

// GET: All users (admin dashboard)
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Change password
router.post('/change-password', async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  if (!userId || !currentPassword || !newPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ message: 'New password must be at least 6 characters long' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Current password is incorrect' });

    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();
    res.status(200).json({ message: 'Password changed successfully!' });
  } catch (err) {
    console.error('Change password error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;