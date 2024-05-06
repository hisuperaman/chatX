import User from "../models/user-model.js";
import Notification from "../models/notification-model.js";

function notificationSocket(io, socket){
    socket.on('notificationRead', async (data)=>{
        try{
            const user = await User.findById(socket.id);
    
            const notificationExists = await Notification.exists({_id: data.id});
            if(notificationExists){
                const notification = await Notification.findById(data.id);
                notification.isRead = true;
                notification.save();
            }
        }
        catch(e){
            
        }

    });
}

export default notificationSocket;