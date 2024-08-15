import express from 'express';
import { getOrders, parchaseUser } from '../controllers/OrderController.js';
import authMiddleware from '../middleware/authMiddleware.js';


const orderRouter = express.Router();

orderRouter.post('/', authMiddleware, parchaseUser);

orderRouter.get('/order', getOrders); 

export default orderRouter;
