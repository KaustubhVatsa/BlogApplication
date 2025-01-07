import express from "express";
import dotenv from "dotenv";
import  authRoutes  from "./routes/auth.route.js"
import connectDB from "./config/db.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 6000;
app.use(express.json());
app.use("/",authRoutes);

app.listen(PORT,()=>{
    console.log("Server listening on Port",PORT)
})
connectDB();