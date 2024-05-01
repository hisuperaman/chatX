import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: [true, "Please provide an email!"],
        unique: [true, "Email already exists!"]
    },
    about: {
        type: String,
        default: ''
    },
    pfp: {
        type: String,
        default: null
    },
    username: {
        type: String,
        required: [true, "Please provide a username!"],
        unique: [true, "Username already exists!"]
    },
    password: {
        type: String,
        required: [true, "Please provide password!"],
        unique: false
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Friend'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
})

const User = mongoose.model("User", UserSchema);

export default User;