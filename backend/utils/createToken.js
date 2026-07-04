import jwt from "jsonwebtoken";
import config from "../config/config.js";

const generateToken = (res, userId) => {
    const token = jwt.sign({userId},config.JWT_SECRET,{
        expiresIn:"7d"
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return token;
}

export default generateToken;