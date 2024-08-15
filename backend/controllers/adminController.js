import adminModel from "../models/adminModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from "validator";

const createAdminToken = (_id) =>{
    return jwt.sign({_id},process.env.JWT_SECRET,{expiresIn:"3d"});
}

const loginAdmin = async (req, res) =>{
    const {email, password} = req.body;
    try {
        const admin = await adminModel.findOne({email});
        if(!admin){
            return res.status(404).json({error:"Admin not found"});
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if(!isMatch){
            return res.status(404).json({error:"Invalid credentials"});
        }
        const adminToken = createAdminToken(admin._id);
        return res.json({success:true,message:"Login successful",adminToken,admin});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Something went wrong"});
    }
}


const registerAdmin = async (req, res) =>{
    const {email, password} = req.body;
    try {
        const exists = await adminModel.findOne({email});
        if(exists){
            return res.status(400).json({error:"Admin already exists"});
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({error:"Invalid email"});
        }
        if(!validator.isStrongPassword(password)){
            return res.json({success:false,message:"Password is not strong enough"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = new adminModel({
            email: email,
            password:hashedPassword
        });
        const admin = await newAdmin.save();
        const adminToken = createAdminToken(admin._id);
        res.json({success:true,message:"User created successfully",adminToken, admin});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Something went wrong"});
    }
}


export {loginAdmin, registerAdmin};