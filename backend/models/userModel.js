import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true,
        enum: ['Male', 'Female'],
    },
    phone:{
        type:Number,
        required:true,
    },
    country: {
        type: String,
        required: true,
        enum: ['Beirut', 'Jounieh', 'Tripoli', 'Saida', 'Tyre', 'Zahle']
      }
    },
    { timestamps: true });



const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;