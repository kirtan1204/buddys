// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import '../styles/Menu.css';
// import { CartContext } from '../context/CartContext';
// import ScrollToTop from '../components/ScrollToTop';

// function Menu() {
//   const { addToCart } = useContext(CartContext);
//   const [menuItems, setMenuItems] = useState([]);
//   const [addedItems, setAddedItems] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/menu')
//       .then(res => setMenuItems(res.data))
//       .catch(err => console.error('Failed to load menu', err));
//   }, []);

//   const handleAdd = (item) => {
//     addToCart(item);
//     setAddedItems((prev) => [...prev, item.name]);
//   };

//   const isItemAdded = (name) => addedItems.includes(name);

//   const renderMenuCard = (item, index) => (
//     <div className="menu-card" key={index}>
//       <h3>{item.name}</h3>
//       <p>₹{item.price}</p>
//       <div className="menu-btn-wrapper">
//         {!isItemAdded(item.name) ? (
//           <button className="menu-btn" onClick={() => handleAdd(item)}>
//             Add to Cart
//           </button>
//         ) : (
//           <span className="added-msg">✔ Added!</span>
//         )}
//       </div>
//     </div>
//   );

//   const groupedItems = menuItems.reduce((acc, item) => {
//     if (!acc[item.section]) acc[item.section] = [];
//     acc[item.section].push(item);
//     return acc;
//   }, {});

//   return (
//     <div className="menu-container">
//       <h2>Our Delicious Menu</h2>
//       <div className="menu-sections">
//         {Object.entries(groupedItems).map(([section, items]) => (
//           <div className="menu-column" key={section}>
//             <h3 className="menu-section-title">{section}</h3>
//             <div className="menu-grid">
//               {items.map(renderMenuCard)}
//             </div>
//           </div>
//         ))}
//       </div>
//       <ScrollToTop />
//     </div>
//   );
// }

// export default Menu;

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Menu.css';
import { CartContext } from '../context/CartContext';
import ScrollToTop from '../components/ScrollToTop';

function Menu() {
  const { addToCart } = useContext(CartContext);
  const [menuItems, setMenuItems] = useState([]);
  const [addedItems, setAddedItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/menu')
      .then(res => {
        const formatted = res.data.map(item => ({
          ...item,
          id: item.id || item._id || item.name // Ensure ID
        }));
        setMenuItems(formatted);
      })
      .catch(err => console.error('Failed to load menu', err));
  }, []);

  const handleAdd = (item) => {
    addToCart(item);
    setAddedItems(prev => [...prev, item.id]);
  };

  const renderMenuCard = (item) => (
    <div className="menu-card" key={item.id}>
      <h3>{item.name}</h3>
      <p>₹{item.price}</p>
      <div className="menu-btn-wrapper">
        {!addedItems.includes(item.id) ? (
          <button className="menu-btn" onClick={() => handleAdd(item)}>Add to Cart</button>
        ) : (
          <span className="added-msg">✔ Added!</span>
        )}
      </div>
    </div>
  );

  const groupedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {});

  return (
    <div className="menu-container">
      <h2>Our Delicious Menu</h2>
      <div className="menu-sections">
        {Object.entries(groupedItems).map(([section, items]) => (
          <div className="menu-column" key={section}>
            <h3 className="menu-section-title">{section}</h3>
            <div className="menu-grid">
              {items.map(renderMenuCard)}
            </div>
          </div>
        ))}
      </div>
      <ScrollToTop />
    </div>
  );
}

export default Menu;
