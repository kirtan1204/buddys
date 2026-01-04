// // pages/Cart.js
// import React, { useContext, useState } from 'react';
// import { CartContext } from '../context/CartContext';
// import { QRCodeCanvas } from 'qrcode.react';
// import '../styles/Cart.css';
// import ScrollToTop from '../components/ScrollToTop';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';

// function Cart() {
//   const { cartItems, removeFromCart, updateQuantity, getTotal, clearCart } = useContext(CartContext);
//   const [showQR, setShowQR] = useState(false);
//   const [showThankYou, setShowThankYou] = useState(false);
//   const navigate = useNavigate();

//   const totalAmount = getTotal();
//   const upiId = "kirtanppatel2612@oksbi";
//   const payeeName = "Buddy's Vadapav";
//   const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${totalAmount}&cu=INR`;

//   const handlePayment = () => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     if (!user) {
//       Swal.fire({
//         title: 'Login Required!',
//         text: 'Please log in to proceed with your order 😊.',
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#d97706',
//         cancelButtonColor: '#999',
//         confirmButtonText: 'Login Now'
//       }).then((result) => {
//         if (result.isConfirmed) {
//           localStorage.setItem('redirectAfterLogin', '/cart');
//           navigate('/login');
//         }
//       });
//     } else {
//       setShowQR(true);
//       setTimeout(() => {
//         setShowQR(false);
//         setShowThankYou(true);
//         clearCart();
//       }, 7000);
//     }
//   };

//   return (
//     <div className="cart-container">
//       <h2>Your Cart</h2>

//       {cartItems.length === 0 && !showThankYou ? (
//         <p>Your cart is empty! 😔</p>
//       ) : (
//         <>
//           {!showThankYou && (
//             <>
//               <div className="cart-items">
//                 {cartItems.map((item) => (
//                   <div className="cart-item" key={item.id}>
//                     <h4>{item.name}</h4>
//                     <p>Price: ₹{item.price}</p>
//                     <div className="quantity-controls">
//                       <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
//                       <span>{item.quantity}</span>
//                       <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
//                     </div>
//                     <p>Subtotal: ₹{item.price * item.quantity}</p>
//                     <button className="cart-remove" onClick={() => removeFromCart(item.id)}>Remove</button>
//                   </div>
//                 ))}
//               </div>

//               <h3>Total: ₹{totalAmount}</h3>
//               <div className="cart-actions">
//                 <button className="clear-cart-btn" onClick={clearCart}>Clear Cart</button>
//                 <button className="pay-now-btn" onClick={handlePayment}>Order Now</button>
//               </div>
//             </>
//           )}
//         </>
//       )}

//       {showThankYou && (
//         <div className="thank-you-msg">
//           <h2>Thank You For Your Order 😊</h2>
//           <p>Your payment is done & your food will reach you soon!</p>
//         </div>
//       )}

//       {showQR && (
//         <div className="qr-modal">
//           <div className="qr-box">
//             <h3>Scan to Pay ₹{totalAmount}</h3>
//             <QRCodeCanvas value={upiLink} size={200} />
//             <h4>{upiId}</h4>
//             <button className="close-btn" onClick={() => setShowQR(false)}>Cancel</button>
//           </div>
//         </div>
//       )}
//       <ScrollToTop />
//     </div>
//   );
// }

// export default Cart;

import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { QRCodeCanvas } from 'qrcode.react';
import '../styles/Cart.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getTotal, clearCart } = useContext(CartContext);
  const [showQR, setShowQR] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const navigate = useNavigate();

  const totalAmount = getTotal();
  const upiId = "kirtanppatel2612@oksbi";
  const payeeName = "Buddy's Vadapav";
  const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${totalAmount}&cu=INR`;

  const handlePayment = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      Swal.fire({
        title: 'Login Required!',
        text: 'Please log in to proceed with your order 😊.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d97706',
        cancelButtonColor: '#999',
        confirmButtonText: 'Login Now'
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.setItem('redirectAfterLogin', '/cart');
          navigate('/login');
        }
      });
    } else {
      setShowQR(true);
      setTimeout(async () => {
        setShowQR(false);
        setShowThankYou(true);
  
        try {
          await axios.post('http://localhost:5000/api/orders', {
            userId: user.id,
            userEmail: user.email,
            items: cartItems,
            totalAmount
          });
  
          console.log("Order saved to DB successfully.");
        } catch (err) {
          console.error("Failed to save order:", err);
          alert("Order failed to save to server.");
        }
  
        clearCart();
      }, 7000);
    }
  };
  
  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 && !showThankYou ? (
        <p>Your cart is empty! 😔</p>
      ) : (
        <>
          {!showThankYou && (
            <>
              <div className="cart-items">
                {cartItems.map(item => (
                  <div className="cart-item" key={item.id}>
                    <h4>{item.name}</h4>
                    <p>Price: ₹{item.price}</p>
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <p>Subtotal: ₹{item.price * item.quantity}</p>
                    <button className="cart-remove" onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                ))}
              </div>
              <h3>Total: ₹{totalAmount}</h3>
              <div className="cart-actions">
                <button className="clear-cart-btn" onClick={clearCart}>Clear Cart</button>
                <button className="pay-now-btn" onClick={handlePayment}>Order Now</button>
              </div>
            </>
          )}
        </>
      )}

      {showThankYou && (
        <div className="thank-you-msg">
          <h2>Thank You For Your Order 😊</h2>
          <p>Your payment is done & your food will reach you soon!</p>
          <p style={{ marginTop: "20px" }}>
          <p className="track-order-link" onClick={() => navigate('/track-order')}>
              <u>Track your order</u>
          </p>
          </p>
        </div>
      )}


      {showQR && (
        <div className="qr-modal">
          <div className="qr-box">
            <h3>Scan to Pay ₹{totalAmount}</h3>
            <QRCodeCanvas value={upiLink} size={200} />
            <h4>{upiId}</h4>
            <button className="close-btn" onClick={() => setShowQR(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
