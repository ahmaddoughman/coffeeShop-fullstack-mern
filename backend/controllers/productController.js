import productModel from '../models/productModel.js';
import categoryModel from '../models/categoryModel.js';
import fs from 'fs/promises';


// add product
const addProduct = async (req, res) => {
    let image = req.body.image;
    
    if (req.file) {
        image = req.file.filename; // Use the file uploaded via multer
    }

    const { price, title_product, description, category_id } = req.body;

    if (!price || !title_product || !description || !category_id) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        const category = await categoryModel.findById(category_id);
        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        const newProduct = new productModel({
            image: image,
            price: price,
            title_product: title_product,
            description: description,
            category_id: category_id
        });

        await newProduct.save();
        res.json({ success: true, message: "Product added successfully" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error adding product" });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        res.json({ success: true, data:products });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error fetching products" });
    }
};

// get all products have same category id
const getProductsByCategoryId = async (req, res) => {
    const { category_id } = req.params;

    try {
        const products = await productModel.find({ category_id: category_id });

        if (!products || products.length === 0) {
            return res.status(404).json({ success: false, message: 'No products found for this category' });
        }

        res.status(200).json({ success: true, data: products });
    } 
    catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error fetching products" });
    }
}

// get product by id
const getProductById = async (req, res) =>{
    const {productId} = req.params;
    try {
        const product = await productModel.findById(productId);
        res.json({success:true, data:product});
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error fetching product" });
    }
}

// update product
const updateProduct = async (req, res) => {
    const { productId } = req.params;
    const { price, title_product, description, category_id } = req.body;

    let image = req.body.image;
    
    if (req.file) {
        image = req.file.filename; // Use the file uploaded via multer
    }

    try {
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        if (image && product.image) {
            try {
                await fs.unlink(`uploads/${product.image}`);
            } catch (err) {
                console.error(`Error deleting old image: ${err.message}`);
            }
        }

        const updateData = {
            price,
            title_product,
            description,
            category_id,
        };

        if (image) {
            updateData.image = image;
        }

        const updatedProduct = await productModel.findByIdAndUpdate(
            productId,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Product not updated' });
        }

        res.json({ success: true, data: updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error updating product" });
    }
};


const deleteProduct = async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        
        fs.unlink(`uploads/${product.image}`);
            
        await productModel.findByIdAndDelete(productId);
        res.json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error deleting product" });
    }
}

export {addProduct, getAllProducts, getProductsByCategoryId, getProductById, updateProduct, deleteProduct};