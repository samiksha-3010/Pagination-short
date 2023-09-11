import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    isNumberVerified: {
        type: Boolean,
        default: false
    },
    otpForNumberVerification: {
        type: Number,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Buyer', 'Seller', "Admin"],
        default: "Buyer"
    },
  
})

export default mongoose.model("User", userSchema)