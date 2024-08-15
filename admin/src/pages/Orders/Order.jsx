import React, { useEffect, useState } from 'react';
import './Order.css';

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${url}/api/purchase/order`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
    
        const data = await response.json();
        setOrders(data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    

    fetchOrders();
  }, [url]);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error fetching orders: {error}</p>;

  return (
    <div className='order-container'>
      <h2>Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className='order-table'>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Total</th>
              <th>Items</th>
              <th>Status</th>            
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user ? (
                  <>
                    <p>{order.user.username}</p>
                    <p>{order.user.phone}</p>
                  </>
                ) : 'Unknown'}</td>
                <td>${order.total}</td>
                <td>
                  <ul className='item-list'>
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.product ? (
                          <>
                            <img 
                              src={`${url}/images/${item.product.image}`} 
                              alt={item.product.title_product} 
                            />
                            <div className='item-details'>
                              <strong>Title: {item.product.title_product}</strong>
                            </div>
                            <div className='item-info'>
                              <span>Quantity: {item.quantity}</span>
                              <span>Price: ${item.price}</span>
                            </div>
                          </>
                        ) : (
                          'Unknown'
                        )}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Order;
