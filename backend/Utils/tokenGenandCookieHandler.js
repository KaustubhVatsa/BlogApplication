import jwt from "jsonwebtoken"

export const tokenGenandCookieSend = (userId , res)=>{
    const token = jwt.sign({userId},process.env.MYSECRET,{
        expiresIn:"7d"
    });
    res.cookie("passkey",token,{
        maxAge:7*24*60*60*1000,
        httpOnly:true,
        samesite:"strict",
        secure:process.env.NODE_ENV !=="developement",
    })
    return token;
}