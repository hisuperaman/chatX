import User from "../models/user-model.js";
import Friend from "../models/friend-model.js";
import Message from "../models/message-model.js";
import mongoose from "mongoose";

function friendSocket(io, socket) {
    socket.on('addFriend', async (data) => {
        try {

            const user = await User.findById(socket.id);
            const friendUser = await User.findById(data.friendId);

            const exists = await Friend.exists({ user: user._id, friend: data.friendId });
            if (exists) {
                socket.emit('requestSentError', { message: 'Friend request already sent' })
                return;
            }
            const receivedRequest = await Friend.exists({ user: data.friendId, friend: user._id });
            if (receivedRequest) {
                socket.emit('requestSentError', { message: 'Friend request pending to respond' })
                return;
            }

            const newFriend = await Friend.create({ user: user._id, friend: data.friendId, status: 'pending' });

            io.to(data.friendId).emit('requestReceived', {
                _id: user._id.toHexString(),
                name: user.name,
                username: user.username,
                about: user.about,
                email: user.email,
                pfp: user.pfp,

                createdAt: newFriend.createdAt

            });
            io.to(data.friendId).emit('requestReceivedInner', {
                request: {
                    _id: user._id.toHexString(),
                    name: user.name,
                    username: user.username,
                    about: user.about,
                    email: user.email,
                    pfp: user.pfp,

                    friendCount: user.friends.length,
                    createdAt: user.createdAt
                },
                metaData: {
                    friendCount: user.friends.length,
                    createdAt: user.createdAt,
                    isFriend: false,
                    isPending: false,
                    isPendingByMe: true
                }
            });

            socket.emit('requestSentConfirmed', { message: 'Friend request sent' });
            socket.emit('requestSentConfirmedInner', { message: 'Friend request sent' });

        }
        catch (e) {
            console.log(e)
            socket.emit('requestSentError', { message: 'Internal server error' });
        }
    })


    socket.on('acceptRequest', async (data) => {
        try {
            const user = await User.findById(socket.id);

            const friendId = data.friendId;

            // console.log(friendId)

            const friendUser = await User.findById(friendId);

            const friend = await Friend.findOne({ user: friendId, friend: user._id, status: 'pending' });
            friend.status = 'accepted';
            await friend.save();

            const message = await Message.create({
                message: "You are now connected on ChatX",
                sendingDatetime: new Date(),
                deliveredDatetime: new Date(),
                readDatetime: new Date(),
                status: 'read',
                isConnectionMsg: true,
                receiver: user._id,
                sender: friendId
            })

            user.friends.push(new mongoose.Types.ObjectId(friendId));
            friendUser.friends.push(new mongoose.Types.ObjectId(user._id));

            await user.save();
            await friendUser.save();

            io.to(data.friendId).emit('newFriend', {
                _id: user._id.toHexString(),
                name: user.name,
                username: user.username,
                about: user.about,
                email: user.email,
                pfp: user.pfp,
            });

            io.to(data.friendId).emit('receiveMessage', {
                ...message._doc,
                isMyMessage: message.sender.toHexString() === friendUser._id.toHexString()
            });

            io.to(data.friendId).emit('requestAccepted', {
                friendCount: user.friends.length,
                createdAt: user.createdAt,
                isFriend: true,
                isPending: false,
                isPendingByMe: false
            });


            socket.emit('newFriend', {
                _id: friendUser._id.toHexString(),
                name: friendUser.name,
                username: friendUser.username,
                about: friendUser.about,
                email: friendUser.email,
                pfp: friendUser.pfp,
            });

            socket.emit('receiveMessage', {
                ...message._doc,
                isMyMessage: message.sender.toHexString() === user._id.toHexString()
            });

            socket.emit('requestAcceptConfirmed', {
                id: friendUser._id.toHexString(),
                friendCount: friendUser.friends.length,
                createdAt: friendUser.createdAt,
                isFriend: true,
                isPending: false,
                isPendingByMe: false
            });
            socket.emit('requestAcceptConfirmedInner', {
                friendCount: friendUser.friends.length,
                createdAt: friendUser.createdAt,
                isFriend: true,
                isPending: false,
                isPendingByMe: false
            });
        }
        catch (e) {
            console.log(e)
            socket.emit('requestAcceptError', { message: 'Internal server error' });
        }
    })


    socket.on('rejectRequest', async (data) => {
        try {
            const user = await User.findById(socket.id);

            const friendId = data.friendId;

            const friendUser = await User.findById(friendId);

            await Friend.deleteOne({ user: friendId, friend: user._id });

            io.to(friendId).emit('requestRejected', {
                friendCount: user.friends.length,
                createdAt: user.createdAt,
                isFriend: false,
                isPending: false,
                isPendingByMe: false
            });

            socket.emit('requestRejectConfirmed', {
                id: friendUser._id.toHexString(),
                friendCount: friendUser.friends.length,
                createdAt: friendUser.createdAt,
                isFriend: false,
                isPending: false,
                isPendingByMe: false
            });
            socket.emit('requestRejectConfirmedInner', {
                friendCount: friendUser.friends.length,
                createdAt: friendUser.createdAt,
                isFriend: false,
                isPending: false,
                isPendingByMe: false
            });
        }
        catch (e) {
            console.log(e)
            socket.emit('requestRejectError', { message: 'Internal server error' });

        }
    })

    socket.on('cancelRequest', async (data) => {
        try {
            const user = await User.findById(socket.id);

            const friendId = data.friendId;

            const friendUser = await User.findById(friendId);

            await Friend.deleteOne({ user: user._id, friend: friendId });

            // console.log(friendId)

            io.to(friendId).emit('requestCanceled', {
                id: user._id.toHexString(),
            });
            io.to(friendId).emit('requestCanceledInner', {
                request: {
                    _id: user._id.toHexString(),
                },
                metaData: {
                    friendCount: user.friends.length,
                    createdAt: user.createdAt,
                    isFriend: false,
                    isPending: false,
                    isPendingByMe: false
                }
            });

            socket.emit('requestCancelConfirmed', {
                friendCount: friendUser.friends.length,
                createdAt: friendUser.createdAt,
                isFriend: false,
                isPending: false,
                isPendingByMe: false
            });
        }
        catch (e) {
            console.log(e)
            socket.emit('requestCancelError', { message: 'Internal server error' });

        }
    })
}

export default friendSocket;