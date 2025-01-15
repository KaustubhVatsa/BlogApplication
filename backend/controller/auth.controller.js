import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import nodemailer from "nodemailer"; 
import crypto from "crypto";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { tokenGenandCookieSend } from "../Utils/tokenGenandCookieHandler.js";
import { transporter } from "../Utils/emailVerification.js";

export const signup = async (req , res )=>{
    try {
        const {username , email , password} = req.body;
        if(!username||!email||!password){
            return res.status(400).json({message:"all fields required"})
        }
        const user = await User.findOne({email});
        if(user){
            console.log(user);
            return res.status(400).json({message:"User already exist! Please login"});

        }
        const salt= await bcrypt.genSalt(10);
        const hashedPassword =await bcrypt.hash(password,salt);
        
        const verificationCode = await sendVerificationEmail(username, email);
        
        const newUser = new User({
            username,
            email,
            password:hashedPassword,
            verificationCode,
            verificationExpires: Date.now() + 7200000
        })

        if(newUser){
            tokenGenandCookieSend(newUser._id,res);
            await newUser.save();
            res.status(200).json({
                _id:newUser._id,
                name:newUser.username,
                email:newUser.email
            })
        }
        else{
            return res.status(400).json({message:"Invalid Traveller Details"})
        }  
    } catch (error) {
        console.log("error in signup controller ", error.message);
        res.status(500).json({message:"Internal server error"})
    }
}

const sendVerificationEmail = async (username, email) => {
    try {
        const verificationCode = crypto.randomInt(100000, 999999).toString();
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const emailBody = fs.readFileSync(path.join(__dirname, '..', 'Utils', 'emailBody.html'), 'utf-8');
        
        const emailContent = emailBody
            .replace('[username]', username)
            .replace('[verificationCode]', verificationCode);


        const mailConfig = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Email Verification',
            html: emailContent,
        };
        await transporter.sendMail(mailConfig);
        return verificationCode;
    }
    catch{
        console.error("Error in sending verification email:", error.message);
        throw new Error("Unable to send verification email.");
    }
}

export const verifyEmail = async (req, res) => {
    try {
        const {email, verificationCode} = req.body;
        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({message: "User not found"});
        }
        if (user.verificationCode !== verificationCode) {
            return res.status(400).json({message: "Invalid verification code"});
        }

        if (user.verificationExpires < Date.now()) {
            return res.status(400).json({message: "Verification code has expired"});
        }
        user.isVerified = true;
        user.verificationCode = undefined; 
        user.verificationExpires = undefined; 
        await user.save();

        res.status(200).json({message: "Email verified successfully"});
    } 
    catch (error) {
        console.log("Error in email verification:", error.message);
        return res.status(500).json({message: "Internal server error"});
    }
};


export const login = async (req ,res)=>{
    try {
        const {email , password} = req.body;
    if(!email||!password){
        return res.status(400).json({message:"Email or password missing"});
    }
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({message:"Invalid Credentials"});
    }
    const passwordValid = await bcrypt.compare(password,user.password);
    if(!passwordValid){
        return res.status(400).json({message:"Invalid Credentials"})
    }
    const isUserVerified = user.isVerified;
    if(!isUserVerified){
        return res.status(400).json({message : `User is not verified. Kindly verify your email '${user.email}'`})
    }
    tokenGenandCookieSend(user._id,res);
    res.status(200).json({
        _id:user._id,
        name:user.username,
        email:user.email
    })
    } catch (error) {
        console.log("Error in login Controller ",error.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const logout = async (req , res)=>{
    try {
        res.cookie("passkey","",{
            maxAge:0,
            httpOnly:true,
            samesite:"strict",
            secure:process.env.NODE_ENV=="production",
            expires:new Date(0)
        })
    
        res.status(200).json({message:"Logged Out successfully"})
    } catch (error) {
        console.log("error in logout functionality",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const checkAuth = (req, res) => {
    try {
      res.status(200).json(req.user);
    } catch (error) {
      console.log("Error in checkAuth controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
