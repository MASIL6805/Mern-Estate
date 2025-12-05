import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique: true,
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type:String,
        required: true,
    },
    avatar:{
        type:String,
        default: 'https://media.istockphoto.com/id/530838817/vector/businessman-profile-icon-male-portrait-flat.jpg?s=612x612&w=0&k=20&c=30i3lGcTm4qHNa0gKTR8oxcaCCBVWyVTiwl_ONAaAdU=',
    },
},{timestamps:true});


const User = mongoose.model('User',userSchema);

export default User;
