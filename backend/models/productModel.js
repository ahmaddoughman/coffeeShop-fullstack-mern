import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    image:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    title_product:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required:true
    },
})

const productModel = mongoose.models.product || mongoose.model('product', productSchema);

export default productModel;