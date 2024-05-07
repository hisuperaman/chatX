import User from "../models/user-model.js";
import Friend from "../models/friend-model.js";
import Message from "../models/message-model.js";
import mongoose from "mongoose";
import Notification from "../models/notification-model.js";


const notificationsLimit = 10;

function friendSocket(io, socket) {
    socket.on('addFriend', async (data) => {
        try {

            const user = await User.findById(socket.id);
            const friendUser = await User.findById(data.friendId);

            const exists = await Friend.exists({ user: user._id, friend: data.friendId, status: 'pending' });
            if (exists) {
                socket.emit('requestSentError', { message: 'Friend request already sent' })
                return;
            }
            const receivedRequest = await Friend.exists({ user: data.friendId, friend: user._id, status: 'pending' });
            if (receivedRequest) {
                socket.emit('requestSentError', { message: 'Friend request pending to respond' })
                return;
            }

            const unfriendedFriend = await Friend.findOne({
                $or: [{ user: data.friendId, friend: user._id }, { user: user._id, friend: data.friendId }],
                status: 'unfriend'
            });
            if (unfriendedFriend) {
                await Friend.deleteOne({ _id: unfriendedFriend._id });
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

            const createdNotification = new Notification({
                receiver: data.friendId,
                sender: user._id,
                notificationType: 'request_sent'
            });
            await createdNotification.save();

            const notification = await Notification.findById(createdNotification._id).populate(['sender', 'receiver']);

            io.to(data.friendId).emit('receiveNotification', {
                notification: {
                    _id: notification._id.toHexString(),

                    senderUsername: notification.sender.username,
                    senderPfp: notification.sender.pfp,

                    notificationType: notification.notificationType,

                    createdAt: notification.createdAt,

                    isRead: notification.isRead,

                    limit: notificationsLimit
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

            const connectionMsgExists = await Message.exists({ $and: [{ $or: [{ sender: friendId, receiver: user._id }, { sender: user._id, receiver: friendId }] }, { isConnectionMsg: true }] });
            let message;
            if (!connectionMsgExists) {
                message = await Message.create({
                    message: "You are now connected on ChatX",
                    sendingDatetime: new Date(),
                    deliveredDatetime: new Date(),
                    readDatetime: new Date(),
                    status: 'read',
                    isConnectionMsg: true,
                    receiver: user._id,
                    sender: friendId
                })
            }
            else {
                message = await Message.create({
                    message: "You are now reconnected on ChatX",
                    sendingDatetime: new Date(),
                    deliveredDatetime: new Date(),
                    readDatetime: new Date(),
                    status: 'read',
                    isReconnectionMsg: true,
                    receiver: user._id,
                    sender: friendId
                })
            }


            user.friends.push(new mongoose.Types.ObjectId(friendId));
            friendUser.friends.push(new mongoose.Types.ObjectId(user._id));

            await user.save();
            await friendUser.save();


            // if [not] friend was already friend, i.e. unfriend then friend
            if (!connectionMsgExists) {
                io.to(data.friendId).emit('newFriend', {
                    _id: user._id.toHexString(),
                    name: user.name,
                    username: user.username,
                    about: user.about,
                    email: user.email,
                    pfp: user.pfp,

                    isOnline: user.isOnline,
                    lastSeen: user.lastSeen,

                    isUnfriend: friend.status==='unfriend'

                });

                socket.emit('newFriend', {
                    _id: friendUser._id.toHexString(),
                    name: friendUser.name,
                    username: friendUser.username,
                    about: friendUser.about,
                    email: friendUser.email,
                    pfp: friendUser.pfp,

                    isOnline: friendUser.isOnline,
                    lastSeen: friendUser.lastSeen,

                    isUnfriend: friend.status==='unfriend'
                });

            }
            else{
                socket.emit('changeIsUnfriend', {
                    user: friendId,
                    isUnfriend: false
                });

                io.to(friendId).emit('changeIsUnfriend', {
                    user: user._id,
                    isUnfriend: false

                });

            }



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



            const createdNotification = new Notification({
                receiver: data.friendId,
                sender: user._id,
                notificationType: 'request_accepted'
            });
            await createdNotification.save();

            const notification = await Notification.findById(createdNotification._id).populate(['sender', 'receiver']);

            io.to(data.friendId).emit('receiveNotification', {
                notification: {
                    _id: notification._id.toHexString(),

                    senderUsername: notification.sender.username,
                    senderPfp: notification.sender.pfp,

                    notificationType: notification.notificationType,

                    createdAt: notification.createdAt,

                    isRead: notification.isRead,

                    limit: notificationsLimit
                }
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


            const createdNotification = new Notification({
                receiver: data.friendId,
                sender: user._id,
                notificationType: 'request_rejected'
            });
            await createdNotification.save();

            const notification = await Notification.findById(createdNotification._id).populate(['sender', 'receiver']);

            io.to(data.friendId).emit('receiveNotification', {
                notification: {
                    _id: notification._id.toHexString(),

                    senderUsername: notification.sender.username,
                    senderPfp: notification.sender.pfp,

                    notificationType: notification.notificationType,

                    createdAt: notification.createdAt,

                    isRead: notification.isRead,

                    limit: notificationsLimit
                }
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
    });


    socket.on('unfriend', async (data) => {
        try {

            const user = await User.findById(socket.id);
            const friendUser = await User.findById(data.friendId);

            const exists = await Friend.exists({ $or: [{ user: user._id, friend: data.friendId }, { user: data.friendId, friend: user._id }] });
            if (!exists) {
                socket.emit('unfriendError', { message: 'User is not friend' })
                return;
            }

            const theFriend = await Friend.findOne({ $or: [{ user: user._id, friend: data.friendId }, { user: data.friendId, friend: user._id }] });
            theFriend.status = 'unfriend';
            theFriend.save();

            // disconnection message
            const message = await Message.create({
                message: "You are now disconnected on ChatX",
                sendingDatetime: new Date(),
                deliveredDatetime: new Date(),
                readDatetime: new Date(),
                status: 'read',
                isReconnectionMsg: true,
                receiver: friendUser._id,
                sender: user._id
            });

            io.to(data.friendId).emit('receiveMessage', {
                ...message._doc,
                isMyMessage: message.sender.toHexString() === friendUser._id.toHexString()
            });
            socket.emit('receiveMessage', {
                ...message._doc,
                isMyMessage: message.sender.toHexString() === user._id.toHexString()
            });

            // decrement friend count
            let userFriendsIndex = user.friends.indexOf(new mongoose.Types.ObjectId(friendUser._id));
            if (userFriendsIndex !== -1) {
                user.friends.splice(userFriendsIndex, 1);
            }

            let friendFriendsIndex = user.friends.indexOf(new mongoose.Types.ObjectId(user._id));
            if (friendFriendsIndex !== -1) {
                friendUser.friends.splice(friendFriendsIndex, 1);
            }

            await user.save();
            await friendUser.save();

            // unfriend socket events
            io.to(data.friendId).emit('unfriended', {
                id: user._id.toHexString(),
            });
            io.to(data.friendId).emit('unfriendedInner', {
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

            socket.emit('unfriendConfirmed', {
                friendCount: friendUser.friends.length,
                createdAt: friendUser.createdAt,
                isFriend: false,
                isPending: false,
                isPendingByMe: false
            });

            socket.emit('changeIsUnfriend', {
                user: data.friendId,
                isUnfriend: true
            });

            io.to(data.friendId).emit('changeIsUnfriend', {
                user: user._id,
                isUnfriend: true
            });

        }
        catch (e) {
            console.log(e)
            socket.emit('unfriendError', { message: 'Internal server error' });
        }
    })
}

export default friendSocket;