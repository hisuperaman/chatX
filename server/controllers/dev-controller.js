import mongoose from "mongoose";
import Friend from "../models/friend-model.js";
import Message from "../models/message-model.js";
import User from "../models/user-model.js";


export async function deleteUser(req, res){
    try{
        
        const body = req.body;
        const friendUsername = body.username;

        const friend = await User.findOne({username: friendUsername})
        const friendId = friend._id;

        await User.deleteOne({_id: friendId});
        await Message.deleteMany({$or: [{sender: friendId}, {receiver: friendId}]});
        await Friend.deleteMany({$or: [{user: friendId}, {friend: friendId}]});



        
        await friend.save();

        return res.status(201).json({
            message: 'User deleted'
        });
    }
    catch(e){
        console.log(e)
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export async function deleteFriend(req, res){
    try{
        
        const body = req.body;
        const friendUsername = body.username;

        const friend = await User.findOne({username: friendUsername})
        const friendId = friend._id;

        friend.friends = [];

        await Message.deleteMany({$or: [{sender: friendId}, {receiver: friendId}]});
        await Friend.deleteMany({$or: [{user: friendId}, {friend: friendId}]});

        await friend.save();

        return res.status(201).json({
            message: 'Friend deleted'
        });
    }
    catch(e){
        console.log(e)
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}