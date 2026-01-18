import mongoose from "mongoose";

const connectDB = async() => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/noteVault`)
        console.log('Database connected successfully');
        
    } catch (error) {
        console.log('MongoDB connection error', error);
        
    }
} 

export default connectDB