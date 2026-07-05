import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/createToken.js";

const createUser = asyncHandler( async (req, res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        throw new Error("Please fill all the inputs");
    }

    const userExists = await User.findOne({email});

    if(userExists){
        return res.status(400).send("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    try{
        const newUser = await User.create({
            username,
            email,
            password: hashPassword
        });
        
        await generateToken(res, newUser._id);

        res.status(201).json({_id: newUser._id, username: newUser.username, email: newUser.email, isAdmin: newUser.isAdmin});
    }catch{
        res.status(400);
        throw new Error("Invalid data");
    }

})

const loginUser = asyncHandler( async (req, res) => {
    const {email, password} = req.body;

    const existingUser = await User.findOne({email});

    if(existingUser){
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if(isPasswordValid){
            await generateToken(res, existingUser._id);

            res.status(201).json({_id: existingUser._id, username: existingUser.username, email: existingUser.email, isAdmin: existingUser.isAdmin});

            return ;
        }
    }

})

const logoutCurrentUser = asyncHandler( async (req, res) => {
    res.cookie("jwt", "",{
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: new Date(0),
    })

    res.status(201).json({
        message: "logged out successfully",
    })

})

const getAllUsers = asyncHandler( async (req, res) => {
    const users = await User.find({});
    res.json(users);
})

const getCurrentUserProfile = asyncHandler( async (req, res) => {
    const user = await User.findById(req.user._id);

    if(user){
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
})

const updateCurrentUserProfile = asyncHandler( async (req, res) => {
    const user = await User.findById(req.user._id);

    if(user){
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;

        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            user.password = hashPassword;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    }
    else {
        res.status(404);
        throw new Error("User Not Found");
    }
})

const deleteUserById = asyncHandler( async (req, res) => {
    const user = await User.findById(req.params.id);

    if(user){
        if(user.isAdmin){
            res.status(400);
            throw new Error("Cannot delete admin user");
        }

        await User.deleteOne({_id: user._id});
        res.json({
            message: "User Removed"
        })
    }
    else{
        res.status(404);
        throw new Error("User not found");
    }
})

const getUserById = asyncHandler( async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");

    if(user){
        res.json(user);
    } else{
        res.status(404);
        throw new Error("User Not FOUND");
    }
})

const updateUserById = asyncHandler( async (req, res) => {
    const user  = await User.findById(req.params.id);

    if(user){
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin);

        const updatedUser = await user.save();
         res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
            })
    }else{
        res.status(404);
        throw new Error("User Not FOUND");
    }
})

export {createUser, loginUser, logoutCurrentUser, getAllUsers, getCurrentUserProfile, updateCurrentUserProfile, deleteUserById, getUserById, updateUserById};

