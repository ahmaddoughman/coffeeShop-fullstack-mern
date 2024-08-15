import express from 'express';
import {addProduct, deleteProduct, getAllProducts, getProductById, getProductsByCategoryId, updateProduct} from '../controllers/productController.js';
import multer from 'multer';

const productRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads"); // Specify the directory to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage:storage });

productRouter.post("/addProduct", upload.single("image"), addProduct);
productRouter.get("/getAllProducts", getAllProducts);
productRouter.get("/getProductsByCategoryId/:category_id", getProductsByCategoryId);
productRouter.get("/getProductById/:productId", getProductById);
productRouter.put("/updateProduct/:productId", upload.single("image"), updateProduct);
productRouter.delete("/deleteProduct/:productId", deleteProduct);








export default productRouter;
