import mongoose from "mongoose";
import config from "./config.js";

async function connectDB() {
    try{
        await mongoose.connect(config.MONGO_URI);
        console.log("Connected to DB successfully 👍");   
    }catch(error){
        console.error(`ERROR: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;