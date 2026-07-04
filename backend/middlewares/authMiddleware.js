import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";
import config from "../config/config.js";

const authenticate = asyncHandler( async (req, res, next) => {
    let token;

    // read jwt
    token = req.cookies.jwt;

    if(token){
        try{
            const decoded = jwt.verify(token, config.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select("-password");
            next();

        }catch(error){
            res.status(401);
            throw new Error("Not Authorized, token  failed.");
            
        }
    }
    else{
        res.status(401);
        throw new Error("Not Authorised, no token.")
    }
})

const authorizeAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next();
    } else {
        res.status(401).send("Not Authorized as an Admin");
    }
}

export {authenticate, authorizeAdmin}