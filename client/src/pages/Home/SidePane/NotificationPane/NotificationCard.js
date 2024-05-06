import { socket } from "../../../../sio";
import ProfilePicture from "../../components/common/ProfilePicture";


function NotReadBadge(){
    return(
        <div className="mt-4 w-3 h-3 flex justify-center items-center text-center rounded-full text-white bg-light-button2Normal dark:bg-dark-button2Normal">
            
        </div>
    )
}

function NotificationCard({notification, setNotificationData}){

    const hours = notification.datetime.getHours();
    const minutes = notification.datetime.getMinutes();

    const hoursString = (hours%12<10 && hours%12!==0)?(`0${hours%12}`):((hours%12===0)?(`12`):(`${hours%12}`));
    const minutesString = (minutes<10)?(`0${minutes}`):(`${minutes}`);
    const notificationTime = `${hoursString}:${minutesString} ${(hours<12 || hours===24)?('AM'):('PM')}`;


    let text = "";
    if(notification.notification_type==="request_sent"){
        text = `sent you a friend request`;
    }
    else if(notification.notification_type==="request_accepted"){
        text = `has accepted your friend request`;
    }
    else if(notification.notification_type==="request_rejected"){
        text = `has rejected your friend request`;
    }


    function handleNotificationClick(){
        if(!notification.isRead){
            socket.emit('notificationRead', {id: notification.id});
    
            setNotificationData((previousNotificationData)=>{
                let newNotification = {...notification, 'isRead': true};
                const notificationDataUpdated = previousNotificationData.filter(n=>n.id!==notification.id);
                console.log(notification.id)
    
                return [...notificationDataUpdated, newNotification];
            })
        }
    }

    return (

        <div onClick={handleNotificationClick} className={`relative flex flex-row cursor-pointer border-b-2 border-light-line dark:border-dark-line p-4 hover:bg-light-hover2 dark:hover:bg-dark-hover2`}>
            <div>
                <ProfilePicture img={(notification)?(notification.senderPfp):('')} />
            </div>

            <div className="flex flex-col justify-center ml-3 w-5/6">
                <p className="font-thin text-sm w-full">
                    <span className="font-bold">{(notification)?(notification.senderUsername):('')} </span>
                    {text}
                </p>

                <p className="mt-1 opacity-80 text-sm">
                    {notificationTime}
                </p>
            </div>

            {
                (notification.isRead)?(''):(<NotReadBadge />)
            }
            

        </div>

    )
}

export default NotificationCard;