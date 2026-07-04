import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), "backend/.env") });

if(!process.env.MONGO_URI){
    throw new Error("Mongo url is not defined in environmental variable");
}

const config = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT || 8080,
    JWT_SECRET: process.env.JWT_SECRET,
    CLOUD_NAME: process.env.CLOUD_NAME,
    CLOUD_API_KEY: process.env.CLOUD_API_KEY,
    CLOUD_API_SECRET: process.env.CLOUD_API_SECRET,
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
}

export default config;
