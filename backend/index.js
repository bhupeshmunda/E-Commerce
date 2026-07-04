import connectDB from "./config/database.js";
import config from "./config/config.js";
import express, { urlencoded } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

await connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);

app.get('/api/config/paypal', (req, res) => {
    res.send({clientId: config.PAYPAL_CLIENT_ID});
})


// const __dirname = path.resolve();
// app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.get("/", (req,res)=>{
    res.send("Hello world");
})

app.listen(config.PORT, ()=>{
    console.log("app is listning at 8080");
})