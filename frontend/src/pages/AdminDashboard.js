import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import '../styles/AdminDashboard.css';
import ScrollToTop from '../components/ScrollToTop';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', price: '', section: '' });
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

  const handleNewItemChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const groupedItems = useMemo(() => {
    return menuItems.reduce((acc, item) => {
      if (!acc[item.section]) acc[item.section] = [];
      acc[item.section].push(item);
      return acc;
    }, {});
  }, [menuItems]);

  const handleAddItem = async () => {
    if (!newItem.name || !newItem.price || !newItem.section) {
      alert("Name, Price, and Section are required");
      return;
    }
    setAdding(true);
    try {
      const res = await axios.post(`${API_BASE}/api/menu`, newItem);
      setMenuItems([...menuItems, res.data]);
      setNewItem({ name: '', price: '', section: '' });
    } catch (err) {
      console.error('Error adding item:', err);
      alert("Failed to add item. Please try again.");
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await axios.delete(`${API_BASE}/api/menu/${id}`);
      setMenuItems(menuItems.filter(item => item._id !== id));
    } catch (err) {
      alert('Failed to delete item. Please try again.');
      console.error(err);
    }
  };

  // Combined data fetching with loading state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, menuRes, ordersRes] = await Promise.all([
          axios.get(`${API_BASE}/api/users`),
          axios.get(`${API_BASE}/api/menu`),
          axios.get(`${API_BASE}/api/orders`)
        ]);
        setUsers(usersRes.data);
        setMenuItems(menuRes.data);
        setOrders(ordersRes.data);
      } catch (err) {
        console.error('Fetch error:', err);
        alert('Failed to load data. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [API_BASE]);

  if (loading) {
    return <div className="admin-dashboard">Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <h2 className="admin-title">
        Admin Dashboard
        <img src="/images/admin-logo.png" alt="Admin Dashboard Logo" className="admin-logo" />
      </h2>
      <p>Manage users, menu, and orders</p>

      {/* Users Table */}
      <div className="table-wrapper">
        <div className='only-admin'><h3>Registered Users</h3></div>
        <table className="user-table" role="table" aria-label="Registered Users">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u._id}>
                <td>{i + 1}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.address || '—'}</td>
                <td>{new Date(u.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Orders */}
      <div className="table-wrapper" style={{ marginTop: '50px' }}>
        <div className='only-admin'><h3>User Orders</h3></div>
        <table className="user-table" role="table" aria-label="User Orders">
          <thead>
            <tr>
              <th>#</th>
              <th>User Email</th>
              <th>Items</th>
              <th>Total (₹)</th>
              <th>Status</th>
              <th>Ordered At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={order._id}>
                <td>{i + 1}</td>
                <td>{order.userId?.email || 'N/A'}</td>
                <td>
                  {order.items.map((item, idx) => (
                    <div key={idx}>{item.name} × {item.quantity}</div>
                  ))}
                </td>
                <td>{order.totalAmount}</td>
                <td>
                  <span className={`status-badge status-${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add New Menu Item */}
      <div className='only-admin'>
        <h3>Add New Item</h3>
      </div>
      <div className="add-item-form">
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={newItem.name}
          onChange={handleNewItemChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newItem.price}
          onChange={handleNewItemChange}
          required
        />
        <select
          name="section"
          value={newItem.section}
          onChange={handleNewItemChange}
          className="section-dropdown"
          required
        >
          <option value="" disabled>Select Section</option>
          <option value="Vadapav">Vadapav</option>
          <option value="Sandwich">Sandwich</option>
          <option value="Drinks">Drinks</option>
        </select>
        <button onClick={handleAddItem} disabled={adding}>
          {adding ? 'Adding...' : 'Add Item'}
        </button>
      </div>

      {/* Menu Items */}
      {Object.entries(groupedItems).map(([section, items]) => (
        <div className="table-wrapper" key={section} style={{ marginTop: '40px' }}>
          <div className='only-admin'>
            <h3>Menu: {section}</h3>
          </div>
          <table className="user-table" role="table" aria-label={`Menu Items for ${section}`}>
            <thead>
              <tr>
                <th>#</th>
                <th>Item</th>
                <th>Price</th>
                <th>Section</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={item._id}>
                  <td>{i + 1}</td>
                  <td>{item.name}</td>
                  <td>₹{item.price}</td>
                  <td>{item.section}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <ScrollToTop />
    </div>
  );
}

export default AdminDashboard;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../styles/AdminDashboard.css';

// function AdminDashboard() {
//   const [users, setUsers] = useState([]);
//   const [menuItems, setMenuItems] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [newItem, setNewItem] = useState({ name: '', price: '', section: '' });

//   const groupedItems = menuItems.reduce((acc, item) => {
//     if (!acc[item.section]) acc[item.section] = [];
//     acc[item.section].push(item);
//     return acc;
//   }, {});

//   const handleNewItemChange = (e) => {
//     setNewItem({ ...newItem, [e.target.name]: e.target.value });
//   };

//   const handleAddItem = async () => {
//     if (!newItem.name || !newItem.price || !newItem.section) {
//       return alert("All fields are required");
//     }
//     try {
//       const res = await axios.post('http://localhost:5000/api/menu', newItem);
//       setMenuItems([...menuItems, res.data]);
//       setNewItem({ name: '', price: '', section: '' });
//     } catch (err) {
//       console.error(err);
//       alert("Failed to add item");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/menu/${id}`);
//       setMenuItems(menuItems.filter(item => item._id !== id));
//     } catch (err) {
//       alert('Delete failed');
//     }
//   };

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/users').then(res => setUsers(res.data));
//     axios.get('http://localhost:5000/api/menu').then(res => setMenuItems(res.data));
//     axios.get('http://localhost:5000/api/orders').then(res => setOrders(res.data));
//   }, []);

//   return (
//     <div className="dashboard-container">
//       <aside className="sidebar">
//         <div className="logo">BUDDY’S Admin</div>
//         <nav>
//           <a href="#users">Users</a>
//           <a href="#orders">Orders</a>
//           <a href="#menu">Menu</a>
//         </nav>
//       </aside>

//       <main className="dashboard-main">
//         <header className="dashboard-header">
//           <h1>Admin Dashboard</h1>
//           <p>Manage users, menu, and orders</p>
//         </header>

//         {/* Users */}
//         <section id="users" className="dashboard-section">
//           <h2>👤 Registered Users</h2>
//           <div className="table-wrapper">
//             <table>
//               <thead>
//                 <tr>
//                   <th>#</th><th>Name</th><th>Email</th><th>Address</th><th>Joined</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.map((u, i) => (
//                   <tr key={u._id}>
//                     <td>{i + 1}</td>
//                     <td>{u.name}</td>
//                     <td>{u.email}</td>
//                     <td>{u.address || '—'}</td>
//                     <td>{new Date(u.createdAt).toLocaleDateString()}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </section>

//         {/* Orders */}
//         <section id="orders" className="dashboard-section">
//           <h2>📦 Orders</h2>
//           <div className="table-wrapper">
//             <table>
//               <thead>
//                 <tr>
//                   <th>#</th><th>User Email</th><th>Items</th><th>Total</th><th>Status</th><th>Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {orders.map((order, i) => (
//                   <tr key={order._id}>
//                     <td>{i + 1}</td>
//                     <td>{order.userId?.email || 'N/A'}</td>
//                     <td>
//                       {order.items.map((item, idx) => (
//                         <div key={idx}>{item.name} × {item.quantity}</div>
//                       ))}
//                     </td>
//                     <td>₹{order.totalAmount}</td>
//                     <td>
//                       <span className={`badge ${order.status.toLowerCase()}`}>
//                         {order.status}
//                       </span>
//                     </td>
//                     <td>{new Date(order.createdAt).toLocaleString()}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </section>

//         {/* Menu */}
//         <section id="menu" className="dashboard-section">
//           <h2>🍔 Menu Items</h2>

//           <div className="add-item-form">
//             <input type="text" name="name" placeholder="Item Name" value={newItem.name} onChange={handleNewItemChange} />
//             <input type="number" name="price" placeholder="Price" value={newItem.price} onChange={handleNewItemChange} />
//             <select name="section" value={newItem.section} onChange={handleNewItemChange}>
//               <option value="" disabled>Select Section</option>
//               <option value="Vadapav">Vadapav</option>
//               <option value="Sandwich">Sandwich</option>
//               <option value="Drinks">Drinks</option>
//             </select>
//             <button onClick={handleAddItem}>Add</button>
//           </div>

//           {Object.entries(groupedItems).map(([section, items]) => (
//             <div className="table-wrapper" key={section}>
//               <h3>{section}</h3>
//               <table>
//                 <thead>
//                   <tr><th>#</th><th>Name</th><th>Price</th><th>Section</th><th>Action</th></tr>
//                 </thead>
//                 <tbody>
//                   {items.map((item, i) => (
//                     <tr key={item._id}>
//                       <td>{i + 1}</td>
//                       <td>{item.name}</td>
//                       <td>₹{item.price}</td>
//                       <td>{item.section}</td>
//                       <td><button className="delete-btn" onClick={() => handleDelete(item._id)}>Delete</button></td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ))}
//         </section>
//       </main>
//     </div>
//   );
// }

// export default AdminDashboard;
