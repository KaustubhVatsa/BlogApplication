import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false 
    },
    verificationCode: {
        type: String,
        required: false
    },
    verificationExpires: {
        type: Date,
        required: false
    }
}, { timestamps: true }); 

const User = mongoose.model("user", userSchema);
export default User;