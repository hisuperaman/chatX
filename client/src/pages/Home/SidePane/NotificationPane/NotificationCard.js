import ProfilePicture from "../../components/common/ProfilePicture";


function NotReadBadge(){
    return(
        <div className="mt-4 w-3 h-3 flex justify-center items-center text-center rounded-full text-white bg-light-button2Normal dark:bg-dark-button2Normal">
            
        </div>
    )
}

function NotificationCard({contact, notification, setNotificationData}){

    const hours = notification.datetime.getHours();
    const minutes = notification.datetime.getMinutes();

    const hoursString = (hours%12<10 && hours%12!==0)?(`0${hours%12}`):((hours%12===0)?(`12`):(`${hours%12}`));
    const minutesString = (minutes<10)?(`0${minutes}`):(`${minutes}`);
    const notificationTime = `${hoursString}:${minutesString} ${(hours<12 || hours===24)?('AM'):('PM')}`;


    let text = "";
    if(notification.notification_type==="friend_request_accepted" && contact){
        text = `accepted your friend request`;
    }


    function handleNotificationClick(){
        setNotificationData((previousNotificationData)=>{
            let newNotification = {...notification, 'isRead': true};

            return {...previousNotificationData, [notification.id]: newNotification};
        })
    }

    return (

        <div onClick={handleNotificationClick} className={`relative flex flex-row cursor-pointer border-b-2 border-light-line dark:border-dark-line p-4 hover:bg-light-hover2 dark:hover:bg-dark-hover2`}>
            <div>
                <ProfilePicture img={(contact)?(contact.pfp):('')} />
            </div>

            <div className="flex flex-col justify-center ml-3 w-5/6">
                <p className="font-thin text-sm w-full">
                    <span className="font-bold">{(contact)?(contact.name):('')} </span>
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