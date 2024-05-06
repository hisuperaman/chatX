import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    notificationType: {
        type: String,
        enum: ['request_accepted', 'request_rejected', 'request_sent']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 7*24*60*60
    },
    isRead: {
        type: Boolean,
        default: false
    }
});


const notificationsLimit = 10;

NotificationSchema.pre('save', async function (next){
    // use .save method only to create new notification
    if(this.isNew){
        const notificationCount = await Notification.countDocuments({receiver: this.receiver});
    
    
        if(notificationCount >= notificationsLimit){
            const oldestDoc = await Notification.findOne({receiver: this.receiver}).sort({createdAt: 1});
    
            await Notification.deleteOne({_id: oldestDoc._id});
        }
    }
    next();
})

const Notification = mongoose.model("Notification", NotificationSchema);

export default Notification;