import mongoose from "mongoose";
import Friend from "../models/friend-model.js";
import Message from "../models/message-model.js";
import User from "../models/user-model.js";


const messagePageSize = 10;

export async function home(req, res) {
    // console.log(req.userId);
    return res.status(200).json({
        success: true,
        message: "Protected route"
    });
}

export async function getUser(req, res) {
    try {
        // console.log(req.userId)
        const user = await User.findById(req.userId);

        const data = { 'username': user.username, 'name': user.name, 'email': user.email, 'about': user.about, 'pfp': user.pfp };

        return res.status(200).json(data);
    }
    catch (e) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export async function updateUser(req, res) {
    try {
        const user = await User.findById(req.userId);

        const body = req.body;

        if (body.name) {
            user.name = body.name;
        }
        if (body.about) {
            user.about = body.about;
        }
        if (body.pfp !== undefined) {
            user.pfp = body.pfp;
        }

        await user.save();

        return res.status(201).json({
            'message': 'Updated successfully'
        })
    }
    catch (e) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}


export async function searchUsers(req, res) {
    try {
        const user = await User.findById(req.userId);

        let users = await User.find({
            username: {
                $regex: '^' + req.query.q,
                $options: 'i',
            }, _id: { $ne: user._id }
        });

        users = users.map((user, index) => {
            return {
                _id: user._id,
                name: user.name,
                email: user.email,
                username: user.username,
                pfp: user.pfp,
                friendCount: user.friends.length,
                createdAt: user.createdAt
            }
        });

        return res.status(200).json({
            users: users
        });
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}


export async function getMessages(req, res) {
    try {
        // console.log(req.userId)
        const user = await User.findById(req.userId);

        const messagesCount = messagePageSize;

        // let messages = await Message.find({$or: [
        //     {sender: user._id},
        //     {receiver: user._id}
        // ]});

        let messages = await Message.aggregate([
            {
                "$match": {
                    $or: [{ sender: user._id }, { receiver: user._id }]
                }
            },
            {
                $sort: {
                    sendingDatetime: -1
                }
            },
            {
                $group: {
                    '_id': {
                        $cond: {
                            if: { $eq: ["$sender", new mongoose.Types.ObjectId(user._id)] },
                            then: "$receiver",
                            else: "$sender"
                        }
                    },
                    messages: {
                        $push: '$$ROOT'
                    }
                }
            },
            {
                $project: {
                    '_id': 0,
                    messages: { $slice: ['$messages', messagesCount] }
                    // messages: '$messages'
                }
            },
            {
                $unwind: '$messages'
            },
            {
                $replaceRoot: { newRoot: '$messages' }
            },
            {
                $sort: {
                    sendingDatetime: 1
                }
            }
        ]);


        messages = messages.map((message, index) => {
            return {
                // ...message._doc,
                ...message,
                isMyMessage: message.sender.toHexString() === user._id.toHexString()
            }
        });

        // console.log(messages);

        return res.status(200).json({
            messages: messages
        });
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export async function getMessagesByFriendId(req, res) {
    try {
        const user = await User.findById(req.userId);

        const params = await req.query;
        const friendId = params.friendId;

        const pageIndex = parseInt(params.pageIndex);
        const pageSize = messagePageSize;

        const offset = (pageIndex+1) * pageSize;


        let messages = await Message.find({
            $or: [
                { sender: user._id, receiver: friendId },
                { sender: friendId, receiver: user._id }
            ]
        }).sort({ 'sendingDatetime': -1 }).skip(offset).limit(pageSize);


        messages = messages.map((message, index) => {
            return {
                ...message._doc,
                isMyMessage: message.sender.toHexString() === user._id.toHexString()
            }
        });

        return res.status(200).json({
            messages: messages,
            pageSize
        });
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}




// friends
export async function getFriends(req, res) {
    try {
        // console.log(req.userId)
        const user = await User.findById(req.userId);

        const friends = (await Friend.find({ $or: [{ user: user._id }, { friend: user._id }], status: 'accepted' }, { friend: 1, user: 1 }).populate(['friend', 'user'])).map((friendObj, idx) => {
            if (friendObj.friend._id.toHexString() === user._id.toHexString()) {
                return {
                    _id: friendObj.user._id.toHexString(),
                    name: friendObj.user.name,
                    username: friendObj.user.username,
                    about: friendObj.user.about,
                    email: friendObj.user.email,
                    pfp: friendObj.user.pfp,
                };
            }
            return {
                _id: friendObj.friend._id.toHexString(),
                name: friendObj.friend.name,
                username: friendObj.friend.username,
                about: friendObj.friend.about,
                email: friendObj.friend.email,
                pfp: friendObj.friend.pfp,
            };
        });

        return res.status(200).json({
            friends: friends
        });
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}


export async function getFriendRequests(req, res) {
    try {
        // console.log(req.userId)
        const user = await User.findById(req.userId);

        const friendRequests = (await Friend.find({ friend: user._id, status: 'pending' }, { user: 1, createdAt: 1 }).populate('user')).map((userObj, idx) => {
            return {
                _id: userObj.user._id.toHexString(),
                name: userObj.user.name,
                username: userObj.user.username,
                about: userObj.user.about,
                email: userObj.user.email,
                pfp: userObj.user.pfp,

                createdAt: userObj.createdAt
            };
        });


        return res.status(200).json({
            friendRequests: friendRequests
        });
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}


export async function getUserProfileData(req, res) {
    try {
        const user = await User.findById(req.userId);

        const body = req.body;

        const friend = await User.findById(body.friendId);

        const isFriend = await Friend.exists({ $or: [{ user: user._id, friend, friend: friend._id }, { user: friend._id, friend, friend: user._id }], status: 'accepted' });
        const isPending = await Friend.exists({ user: user._id, friend, friend: friend._id, status: 'pending' });
        const isPendingByMe = await Friend.exists({ user: friend._id, friend, friend: user._id, status: 'pending' });

        const data = {
            friendCount: friend.friends.length,
            createdAt: friend.createdAt,
            isFriend: Boolean(isFriend && isFriend._id),
            isPending: Boolean(isPending && isPending._id),
            isPendingByMe: Boolean(isPendingByMe && isPendingByMe._id)
        }

        return res.status(200).json(data);
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export async function rejectRequest(req, res) {
    try {
        const user = await User.findById(req.userId);

        const body = req.body;
        const friendId = body.friendId;

        await Friend.deleteOne({ user: friendId, friend: user._id });

        return res.status(201).json({
            message: 'Request rejected'
        });
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}