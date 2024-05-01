import mongoose from "mongoose";

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide an email!"],
        unique: [true, "Email already exists!"]
    },

    otp: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60*5,
    }
});

const OTP = mongoose.model("Otp", OTPSchema);

export default OTP;