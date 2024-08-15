import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import './Cart.css';

const Cart = () => {
    const { cartItems = {}, url, filteredProducts = [], product = [], removeFromCart } = useContext(StoreContext);
    const navigate = useNavigate();

    // Combine filteredProducts and product into a single array with all products
    const allProducts = [...filteredProducts, ...product.filter(p => !filteredProducts.some(fp => fp._id === p._id))];


    const handleParchase = async () => {
        const items = Object.keys(cartItems).map(itemId => {
            const product = allProducts.find(p => p._id === itemId);
            return {
                product: itemId, // Use 'product' here to match the schema
                quantity: cartItems[itemId],
                price: product ? product.price : 0
            };
        });
    
        try {
            const response = await fetch(`${url}/api/purchase`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("tokenUser")}`
                },
                body: JSON.stringify({
                    items,
                    total: Object.keys(cartItems).reduce((total, itemId) => {
                        const product = allProducts.find(p => p._id === itemId);
                        return total + (product ? product.price * cartItems[itemId] : 0);
                    }, 0) + 10 // Add delivery fee
                })
            });
    
            const result = await response.json();
    
            if (response.ok) {
                // Handle successful purchase, e.g., show a success message or redirect
                alert('Purchase successful!');
                navigate('/');
            } else {
                // Handle errors, e.g., show an error message
                alert(result.message || 'Failed to complete purchase.');
            }
        } catch (error) {
            console.error('Error during purchase:', error);
            alert('An error occurred. Please try again.');
        }
    };
    

    return (
        <div className='cart'>
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {
                    allProducts.map((item, index) => {
                        const quantity = cartItems[item._id] || 0;
                        if (quantity > 0) {
                            return (
                                <div key={index}>
                                    <div className='cart-items-title cart-items-item'>
                                        <img src={`${url}/images/${item.image}`} alt={item.name} />
                                        <p>{item.title_product}</p>
                                        <p>${item.price}</p>
                                        <p>{quantity}</p>
                                        <p>${item.price * quantity}</p>
                                        <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
                                    </div>
                                    <hr />
                                </div>
                            );
                        }
                        return null; // Return null if the quantity is not greater than 0
                    })
                }
            </div>
            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>${Object.keys(cartItems).reduce((total, itemId) => {
                                const product = allProducts.find(p => p._id === itemId);
                                return total + (product ? product.price * cartItems[itemId] : 0);
                            }, 0)}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery fee</p>
                            <p>$10</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>${Object.keys(cartItems).reduce((total, itemId) => {
                                const product = allProducts.find(p => p._id === itemId);
                                return total + (product ? product.price * cartItems[itemId] : 0);
                            }, 0) + 10}</b>
                        </div>
                    </div>
                    <button onClick={() => handleParchase()}>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cart-promocode">
                    <div>
                        <p>If you have a promo code, Enter it here</p>
                        <div className='cart-promocode-input'>
                            <input type="text" placeholder='promo code' />
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
