import mongoose from "mongoose";

const connectDB =async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGOURL);
        console.log("Connected to database ", conn.connection.host)
    } catch (error) {
        console.log("erorr in connecting to database", error.message);
    }
}

export default connectDB;