import User from "../models/user-model.js";
import Message from "../models/message-model.js";
import { v4 as uuidv4 } from 'uuid';

function chatSocket(io, socket) {
    socket.on('sendMessage', async (data) => {
        try {
            const user = await User.findById(socket.id);

            const message = await Message.create({
                message: data.messageObj.message,

                sendingDatetime: data.messageObj.sendingDatetime,

                status: 'sent',
                receiver: data.receiver,
                sender: user._id,
                isMyMessage: true
            })

            const messageObj = message._doc;

            io.to(data.receiver).emit('receiveMessage', {
                ...messageObj,
                messageId: messageObj._id,
                isMyMessage: false
            });


            // send confirmed
            socket.emit('sendMessageConfirmed', {
                id: data.messageObj.id,
                messageId: messageObj._id,
                // messageId: data.messageObj.messageId,
                receiver: data.receiver,
                status: 'sent',
                sentDatetime: messageObj.sentDatetime,
                sendingDatetime: messageObj.sendingDatetime
            });
        }
        catch (e) {
            socket.emit('sendMessageError', { message: 'Internal server error' });
        }
    })


    socket.on('readMessage', async (data) => {
        const user = await User.findById(socket.id);

        const updatedMessages = await Message.updateMany(
            {
                sender: data.sender,
                receiver: user._id,
                status: { $ne: 'read' }
            },
            { $set: { status: 'read', readDatetime: data.readDatetime } }
        );

        io.to(data.sender).emit('readStatusChange', {
            receiver: user._id,
            status: 'read',
            readDatetime: data.readDatetime
        });

        socket.emit('readMessageConfirmed', {
            sender: data.sender,
            status: 'read',
            readDatetime: data.readDatetime
        });
    });

    socket.on('deliverMessage', async (data) => {
        try {
            const user = await User.findById(socket.id);

            const message = await Message.findById(data.messageId);
            message.deliveredDatetime = data.deliveredDatetime;
            if (message.status !== 'read') {
                message.status = 'delivered';

                io.to(data.sender).emit('deliveredStatusChange', {
                    messageId: data.messageId,
                    receiver: user._id,
                    status: 'delivered',
                    deliveredDatetime: data.deliveredDatetime
                });

                socket.emit('deliverMessageConfirmed', {
                    sender: data.sender,
                    status: 'delivered',
                    deliveredDatetime: data.deliveredDatetime
                });

            }
            message.save();
        }
        catch (e) {
            console.log(e);
        }
    });

    socket.on('deliverMessageAll', async (data) => {
        const user = await User.findById(socket.id);

        const updatedMessages = await Message.updateMany(
            {
                receiver: user._id,
                status: 'sent'
            },
            { $set: { status: 'delivered', deliveredDatetime: data.deliveredDatetime } }
        );

        socket.broadcast.emit('deliveredStatusChangeAll', {
            receiver: user._id,
            status: 'delivered',
            deliveredDatetime: data.deliveredDatetime
        });

    });
}

export default chatSocket;