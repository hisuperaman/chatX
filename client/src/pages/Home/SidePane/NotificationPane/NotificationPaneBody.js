import DateBar from "./DateBar";
import NotificationCard from "./NotificationCard";
import { useEffect, useState } from "react";

function NotificationPane({notificationData, setNotificationData, contactData}){

    const [notificationItems, setNotificationItems] = useState(null);

    function groupByDate(data){
        const groupedData = {};
        data.forEach(([id, notification]) => {

            // console.log(message)
            const strDatetime = `${notification.datetime.getFullYear()}/${notification.datetime.getMonth()+1}/${notification.datetime.getDate()}`
            const key = strDatetime.split('T')[0];
            if(!groupedData[key]){
                groupedData[key] = [];
            }
            
            groupedData[key].push({...notification, id});
        });

        return groupedData;
    }

    useEffect(()=>{
        const sortedNotifications = Object.entries(notificationData).sort((a, b)=>b[1].datetime.getTime()-a[1].datetime.getTime());

        // console.log(sortedNotifications)

        const groupByDateNotifications = groupByDate(sortedNotifications);

        const notificationElements = Object.entries(groupByDateNotifications).map(([date, notifications])=>{
            return notifications.map((notification, index)=>{
                const contact = contactData.find(obj=>obj.id===notification.senderID);
                
                return (
                    <li key={notification.id}>
                        <DateBar date={date} isFirstNotification={index===0} />
                        <NotificationCard contact={contact} notification={notification} setNotificationData={setNotificationData} />
                    </li>
                )
            })
        })

        setNotificationItems(notificationElements);

    }, [notificationData, contactData, setNotificationData])

    return (
        <>
            <ul className="w-full">

                {notificationItems}
                
            </ul>
        </>
    )
}

export default NotificationPane;