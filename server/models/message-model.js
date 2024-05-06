import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    message: {
        type: String,
        required: true
    },
    sendingDatetime: {
        type: Date
    },
    sentDatetime: {
        type: Date,
        default: Date.now
    },
    deliveredDatetime: {
        type: Date,
    },
    readDatetime: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['sending', 'sent', 'delivered', 'read'],
        default: false
    },
    isConnectionMsg: {
        type: Boolean,
        default: false
    },
})

const Message = mongoose.model('Message', MessageSchema);

export default Message;