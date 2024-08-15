import { addCategory, deleteCategory, getCategory, getCategoryId, updateCategory } from "../controllers/categoryController.js";
import express from "express";
import multer from "multer";

const  categoryRouter = express.Router();

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



categoryRouter.post("/addCategory",upload.single("image"), addCategory);
categoryRouter.get("/getCategory", getCategory);
categoryRouter.get("/getCategoryId/:id", getCategoryId);
categoryRouter.put("/updateCategory/:id", updateCategory);
categoryRouter.delete("/deleteCategory/:id", deleteCategory);

export default categoryRouter;