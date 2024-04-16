

// export const signup =  (req, res) => {
//     res.send("signup User")
//     console.log("signup User");
// }

import User from "../models/userModels.js";
import bcrypt from "bcryptjs";
import generateTokenAndSecretCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const {fullName, username, password, confirmPassword, gender} = req.body;
        
        if(password !== confirmPassword) {
            return res.status(400).json({error: "Password don't match"});
        }

        const user = await User.findOne({username});

        if(user) {
            return res.status(400).json({error: "Username already exists"});
        }

        // HASH PASSWORD HERE 
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);


        //https://avatar-placeholder.iran.liara.run/ 

        const boyProfilePic = `https://avatar-placeholder.iran.liara.run/public/boy?username=${username}` 
        const girlProfilePic = `https://avatar-placeholder.iran.liara.run/public/girl?username=${username}` 

        const newUser = new User({
            fullName,
            username,
            password: hashPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })

        if(newUser) {
            // generate JWT token here 
            generateTokenAndSecretCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            })
        }

        else {
            console.log("Error in giving data", error.message);
            res.status(400).json({error: "Invalid user data"});
        }
        
        
   } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({error:"Internal Server Error"});        
    }
}

export const login = async (req, res) => {
    try {
        const {username, password} = req.body;

        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPasswordCorrect) {
            return res.status(400).json({error: "Invalid username or password"});
        }

        generateTokenAndSecretCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        });


    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({error:"Internal Server Error"}); 
    }
};

export const logout = (req, res) => {
    try {
        
    res.cookie("jwt", "", {maxAge: 0});
    res.status(200).json({message: "Logged out successfully"});

    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({error:"Internal Server Error"}); 
    }
};