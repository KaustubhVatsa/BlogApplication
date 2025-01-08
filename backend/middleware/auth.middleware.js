//this is a middleware function used to protect the routes.
//it allows only the authenticated users to follow up on the next block of function.

import jwt from "jsonwebtoken"
import User from "../models/user.model.js";

export const protectedRoute = async (req ,res ,next)=>{
    try {
        const token = req.cookies.passkey;
        //if no token found then... tell user to authenticate.
        if(!token){
            return res.status(400).json({message:"No Authentication Token found: Please Login Again !!"})
        }
        const decoded = jwt.verify(token,process.env.MYSECRET);
        if(!decoded){
            return res.status(400).json({message:"Invalid Token: Please Login Again !!"})
        }
        const user = await (User.findById(decoded.userId)).select("-password");
        if(!user){
            return res.status(404).json({message:"User Not Found!!"});
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protected route",error.message);
        res.status(500).json({message:"Internal Server Error"})
    }
}