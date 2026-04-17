import express from 'express';
import User from '../model/UserModel.js';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const registerUser = async(req,res)=>{
    try{

        const {name, email, password, role} = req.body;
        //validate here
        const user = await User.findOne({email});

        if(user){
            return res.status(400).json({success:false, message: 'User already exists'});
        }

         if(password.length<8){
         return res.status(400).json({success:false, message: 'Must be equal or more than 8 digit'});
      }
        if(!name || !email || !password || !role){
            return res.status(400).json({success:false, message: 'Please fill all the fields'});
        }

        if(email && !/^\S+@\S+\.\S+$/.test(email)){
            return res.status(400).json({success:false, message: 'Please enter a valid email'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        await newUser.save();
        //generate token here 
        const token = jwt.sign(
            {id: newUser._id, role: newUser.role},
            process.env.JWT_SECRET,
            {expiresIn: '3d'}
        )

         res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });

    }catch(err){
        res.status(500).json({success:false, message: 'Server Error'});
        console.error(err);
    }
}


const loginUser = async(req,res)=>{
    try{
        const {email, password,} = req.body;

        if(!email || !password){
            return res.status(400).json({success:false, message: 'Please fill all the fields'});
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success:false, message: 'Invalid credentials'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({success:false, message: 'Invalid credentials'});
        }

        const token = jwt.sign(
            {id: user._id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: '3d'}
        )

            res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });


    }catch(err){
        res.status(500).json({success:false, message: 'Server Error'});
        console.error(err);
    }
}

const getMe = async(req,res)=>{
    try{
      if(!req.user){
     return res.status(401).json({ success: false, message: 'Not authorized' });
      }

      res.status(200).json({success:true, message:"User Fetched", user:{
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      }})
    }catch(err){
        console.log(err);
         res.status(500).json({ success: false, message: 'Server Error' });
    }
}


const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide current and new password"
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 8 characters long"
      });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const uplodImageHandler = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    user.profileImage = `uploads/${req.file.filename}`;
    await user.save();

    res.status(200).json({ 
      success: true, 
      message: 'Profile image uploaded', 
      profileImage: user.profileImage 
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
export {registerUser, loginUser, getMe, uplodImageHandler, changePassword};