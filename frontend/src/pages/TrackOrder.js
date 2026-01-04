import React from 'react';
import '../styles/TrackOrder.css';

function TrackOrder() {
  return (
    <div className="track-order-container">
      <h2>Live Order Tracking 🚚</h2>
      <div className="tracking-animation">
        <p>Your order is being prepared, packed, and delivered! 🍽️</p>
        <div className="loader"></div>
      </div>
    </div>
  );
}

export default TrackOrder;
