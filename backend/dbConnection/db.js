import mongoose from "mongoose";

export const connectDb = async () =>{
    await mongoose.connect('mongodb+srv://ahmaddoughman1234:Thh1h1NuyXbiMZH8@cluster0.78qmx.mongodb.net/coffeeshop')
    .then(() => console.log('MongoDB Connected'))

}
