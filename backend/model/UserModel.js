import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type:String, required: true},
    email: {type:String, required: true, unique: true, match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'] },
    password: {type:String, required: true},
    role: {type:String, enum: ['jobseeker', 'employer'], default:null, required:true },
    createdAt: {type: Date, default: Date.now},
    profileImage: { type: String, default: "" }
})

const User = mongoose.model('User', userSchema);
export default User;