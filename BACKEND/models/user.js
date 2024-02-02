import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    

}, { timestamps: true });

export default mongoose.model("User", userSchema);