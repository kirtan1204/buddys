import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import '../styles/UserProfile.css';

function UserProfile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const imageKey = `profileImage_${user?.email}`; // unique key per user
  const [profileImage, setProfileImage] = useState(localStorage.getItem(imageKey) || '');

  useEffect(() => {
    if (user && profileImage) {
      localStorage.setItem(imageKey, profileImage);
    }
  }, [profileImage, imageKey, user]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setProfileImage('');
    localStorage.removeItem(imageKey);
  };

  if (!user) {
    return <p>Please login to view your profile.</p>;
  }

  return (
    <div className="user-profile-container">
      <h2>User Profile</h2>

      {profileImage ? (
        <img src={profileImage} alt="Profile" className="profile-image" />
      ) : (
        <FaUserCircle className="user-icon" />
      )}

      <div className="upload-controls">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          id="upload-profile"
          hidden
        />
        <label htmlFor="upload-profile" className="upload-btn">Upload Photo</label>
        {profileImage && (
          <button onClick={handleRemoveImage} className="remove-btn">Remove Photo</button>
        )}
      </div>

      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <p className="change-password-text">
        Need to change password? <span onClick={() => navigate('/change-password')}>Change</span>
      </p>
    </div>
  );
}

export default UserProfile;
