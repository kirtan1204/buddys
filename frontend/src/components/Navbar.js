import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa';

import Swal from 'sweetalert2';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, [location]); // Update on route change (login/logout)

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setMenuOpen(false);
    //swal fire is for good looking alert of login out!
    Swal.fire({
      title: 'Logged Out!',
      icon: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#d97706',
      cancelButtonColor: '#999',
      confirmButtonText: 'OK!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.setItem('redirectAfterLogin', '/');
        navigate('/');
      }
    });
    
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <NavLink to="/">BUDDY’s Vadapav</NavLink>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <li><NavLink to="/" onClick={toggleMenu} className={({ isActive }) => isActive ? 'active-link' : ''}>Home</NavLink></li>
        <li><NavLink to="/about" onClick={toggleMenu} className={({ isActive }) => isActive ? 'active-link' : ''}>About</NavLink></li>
        <li><NavLink to="/menu" onClick={toggleMenu} className={({ isActive }) => isActive ? 'active-link' : ''}>Menu</NavLink></li>
        
        <li><NavLink to="/cart" onClick={toggleMenu} className={`nav-button ${location.pathname === '/cart' ? 'active-link' : ''}`}>Cart</NavLink></li>
        {/* Track Order - only if user is logged in and has order */}
        {user?.hasOrder && (
          <li>
            <NavLink to="/track-order">Track Order</NavLink>
          </li>
        )}


        {/* Admin Dashboard Link */}
        {user?.role === 'admin' && (
          <li>
            <NavLink to="/admin" onClick={toggleMenu} className={({ isActive }) => isActive ? 'active-link' : ''}>
              Dashboard
            </NavLink>
          </li>
        )}

        {/* Login / Logout */}
        {user ? (
        <>
          <li>
            <NavLink onClick={handleLogout} className="nav-button nav-logout-btn">Logout</NavLink>
        </li>
    
        {/* Profile Icon - Change Password Link */}
        <li>
          <NavLink
          to="/profile"
          onClick={toggleMenu}
          className={({ isActive }) => isActive ? 'active-link profile-link' : 'profile-link'}
          >
          <FaUserCircle className="nav-profile-icon" />
          </NavLink>
        </li>
      </>
    ) : (
    <li>
      <NavLink to="/login" onClick={toggleMenu} className={`nav-button ${location.pathname === '/login' ? 'active-link' : ''}`}>
        Login
      </NavLink>
    </li>
  )}

  </ul>

    </nav>
    
  );
}

export default Navbar;