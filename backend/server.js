import express from 'express';
import cors from 'cors';
import {connectDb} from './dbConnection/db.js';  
import categoryRouter from './routes/categoryRoute.js';
import productRouter from './routes/productRoute.js';
import 'dotenv/config'
import adminRouter from './routes/adminRoute.js';
import userRouter from './routes/userRoute.js';
import orderRouter from './routes/OrderRouter.js';


const app = express();
const port = 4000;

// middleware
app.use(express.json());

const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
};
  
app.use(cors(corsOptions));

// dbconnection
connectDb();

// routes
app.use("/api/category", categoryRouter)
app.use("/images",express.static('uploads'))
app.use("/api/product", productRouter)
app.use("/api/admin", adminRouter)
app.use("/api/user", userRouter)
app.use("/api/purchase", orderRouter)


app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
