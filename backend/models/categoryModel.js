import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
    image:{
        type: String,
        required: true
    },
    title_category:{
        type: String,
        required: true
    }
})

const categoryModel = mongoose.models.category || mongoose.model('category', categorySchema);

export default categoryModel;