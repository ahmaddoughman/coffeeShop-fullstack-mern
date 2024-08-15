import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from "validator";

const createUserToken = (_id) =>{
    return jwt.sign({_id},process.env.JWT_SECRET,{expiresIn:"3d"});
}

const loginUser = async (req, res) =>{
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).json({error:"User not found"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(404).json({error:"Invalid credentials"});
        }
        const userToken = createUserToken(user._id);
        return res.json({success:true,message:"Login successful",userToken,user});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Something went wrong"});
    }
}


const registerUser = async (req, res) =>{
    const {username, email, password, gender, phone, country} = req.body;
    try {
        const exists = await userModel.findOne({email});
        if(exists){
            return res.status(400).json({error:"User already exists"});
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({error:"Invalid email"});
        }
        if(!validator.isStrongPassword(password)){
            return res.json({success:false,message:"Password is not strong enough"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            username: username,
            email: email,
            password:hashedPassword,
            gender:gender,
            phone:phone,
            country:country
        });
        const user = await newUser.save();
        const userToken = createUserToken(user._id);
        res.json({success:true,message:"User created successfully",userToken, user});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Something went wrong"});
    }
}

const getUser = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
       
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded._id;

        const user = await userModel.findById(userId).select('-password'); 

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ user });

    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


export {loginUser, registerUser, getUser};