import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Menu from './pages/menu';
import About from './pages/about';
import Login from './pages/login';
import UserProfile from './components/UserProfile';
import ChangePassword from './pages/ChangePassword';
import Register from './pages/register';
import Cart from './pages/cart';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TrackOrder from './pages/TrackOrder';


// import ModeToggle from './components/ModeToggle';

import ProtectedRoute from './components/ProtectedRoute';
import { CartProvider } from './context/CartContext';  
import './App.css';

function App() {

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <CartProvider> 
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/track-order" element={<TrackOrder />} />
          
          
          {/* ✅ Admin Dashboard (protected) */}
          <Route path="/admin" element={ <ProtectedRoute user={user} requiredRole="admin">
              <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        {/* <ModeToggle /> */}
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
