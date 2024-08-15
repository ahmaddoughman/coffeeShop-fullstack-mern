import OrderModel from '../models/OrderModel.js';
import userModel from '../models/userModel.js';

const parchaseUser = async (req, res) => {
    const { items, total } = req.body;
    const userId = req.user._id;

    try {
        
        const cartTotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        
        if (total !== cartTotal + 10) { 
            return res.status(400).json({ success: false, message: 'Total amount does not match.' });
        }

        
        const newOrder = new OrderModel({
            user: userId,
            items,
            total,
            status: 'Pending',
        });

        await newOrder.save();

        res.status(201).json({ success: true, message: 'Order placed successfully' });
    } catch (error) {
        console.error('Error processing order:', error);
        res.status(500).json({ success: false, message: 'Failed to process order' });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find().populate('user').populate('items.product');
        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch orders' });
    }
};

export { parchaseUser, getOrders };
