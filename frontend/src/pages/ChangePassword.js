import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ChangePassword.css';

function ChangePassword() {
  const [current, setCurrent] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [msg, setMsg] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleChange = async () => {
    if (!current || !newPass) {
      setMsg('Both current and new passwords are required.');
      return;
    }

    if (newPass !== confirmPass) {
      setMsg('New password and confirm password do not match.');
      return;
    }    

    if (!user || (!user._id && !user.id)) {
      setMsg('User not found. Please log in again.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/users/change-password', {
        userId: user._id || user.id,
        currentPassword: current,
        newPassword: newPass
      });

      setMsg(res.data.message || 'Password changed successfully!');
      setCurrent('');
      setNewPass('');

      // Auto logout and redirect after 3 seconds
      setTimeout(() => {
        localStorage.removeItem('user');
        window.location.href = '/login';
      }, 3000);

    } catch (err) {
      setMsg(err.response?.data?.message || 'Failed to change password.');
    }
  };

  return (
    <div className="change-password-container">
      <h2>Change Password</h2>
      <input
        type="password"
        placeholder="Current Password"
        value={current}
        onChange={(e) => setCurrent(e.target.value)}
      />
      <input
        type="password"
        placeholder="New Password"
        value={newPass}
        onChange={(e) => setNewPass(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm New Password"
        value={confirmPass}
        onChange={(e) => setConfirmPass(e.target.value)}
      />
      <button onClick={handleChange}>Update Password</button>

      {/* Success or Error Message */}
      {msg && <p className="feedback-msg">{msg}</p>}

      {/* Show extra info only if password was changed successfully */}
      {msg === 'Password changed successfully!' && (
        <p className="feedback-msg" style={{ color: 'gray' }}>
          You will be logged out in 3 seconds...
        </p>
      )}
    </div>
  );
}

export default ChangePassword;
