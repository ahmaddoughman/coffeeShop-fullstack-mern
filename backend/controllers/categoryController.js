import categoryModel from "../models/categoryModel.js";
import fs from 'fs';

const addCategory = async (req, res) =>{
    let image = req.body.image;
    
    if (req.file) {
        image = req.file.filename;  // Use the file uploaded via multer
    }

    const newCategory = new categoryModel({
        image: image,
        title_category: req.body.title_category
    });
    try {
        await newCategory.save();
        res.json({success:true, message: "Food added successfully"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message:"Error adding"})        
    }

}

const getCategory = async (req,res) =>{
    try {
        const category = await categoryModel.find();
        res.json({success: true, data: category});
    } catch (error) {
        console.log(error);
        res.json({success: false, message:"Error get category"})
    }
}

// get category id
const getCategoryId = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await categoryModel.findById(id);
        res.json({success:true, data:category});
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error fetching category" });
    }
}

const updateCategory = async (req, res) =>{
    try {
        const category = await categoryModel.findById(req.params.id);
        if(!category){
            return res.status(404).json({message: "Category not found"});
        }
        const updatedCategory = await categoryModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            success: true,
            data: updatedCategory,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}


const deleteCategory = async (req, res) =>{
    try {
        const category = await categoryModel.findById(req.params.id);
        if(!category){
            return res.status(404).json({message: "Category not found"});
        }

        fs.unlink(`uploads/${category.image}`, ()=>{});

        await categoryModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Category deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

export {addCategory, getCategory, getCategoryId, updateCategory, deleteCategory};