import mongoose from "mongoose";

const FriendSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    friend: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'unfriend'],
        default: 'pending'
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    isReconnected: {
        type: Boolean,
        default: false
    }
    ,
    
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }]
})

const Friend = mongoose.model('Friend', FriendSchema);

export default Friend;