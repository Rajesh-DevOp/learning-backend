import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";


export const connectDB= async ()=>{
    try {
        const connectionInstance = mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        // console.log(`MongoDB connected DB Host :${connectionInstance.connection}`);
    } catch (error) {
        console.log("DB connection failed",error);
        process.exit(1);
    }
} 