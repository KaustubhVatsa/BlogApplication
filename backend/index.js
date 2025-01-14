import express from "express";
import dotenv from "dotenv";
import  authRoutes  from "./routes/auth.route.js"
import connectDB from "./config/db.js";
import cors from "cors"
import cookieParser from "cookie-parser";
const app = express();
dotenv.config();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());
const PORT = process.env.PORT || 6000;
app.use(express.json());
app.use("/",authRoutes);

app.listen(PORT,()=>{
    console.log("Server listening on Port",PORT)
})
connectDB();