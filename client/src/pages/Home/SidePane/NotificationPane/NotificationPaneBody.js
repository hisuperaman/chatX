import DateBar from "./DateBar";
import NotificationCard from "./NotificationCard";
import config from "../../../../config";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../components/AuthContext";
import Spinner from "../../../../components/common/Spinner";
import { NothingFoundIcon } from "./components/NothingFoundIcon";


function NotificationButton({ onButtonClick, text, isLoading }) {
    return (
        <div className="ml-auto mr-2 mt-2 p-1 w-28 text-white flex justify-center items-center text-center border border-light-line dark:border-dark-line bg-light-bigButtonNormal dark:bg-dark-bigButtonNormal cursor-pointer hover:bg-light-bigButtonHover dark:hover:bg-dark-bigButtonHover">
            {
                isLoading ? <Spinner isSmall={true} />
                    : <div onClick={onButtonClick}>
                        {text}
                    </div>
            }

        </div>
    )
}


function NotificationPane({ notificationData, setNotificationData, contactData }) {

    const [notificationItems, setNotificationItems] = useState(null);

    const { token } = useContext(AuthContext);

    const [primaryButtonLoading, setPrimaryButtonLoading] = useState(false);

    function groupByDate(data) {
        const groupedData = {};
        data.forEach(([index, notification]) => {

            // console.log(message)
            const strDatetime = `${notification.datetime.getFullYear()}/${notification.datetime.getMonth() + 1}/${notification.datetime.getDate()}`
            const key = strDatetime.split('T')[0];
            if (!groupedData[key]) {
                groupedData[key] = [];
            }

            groupedData[key].push({ ...notification });
        });

        return groupedData;
    }

    useEffect(() => {
        const sortedNotifications = Object.entries(notificationData).sort((a, b) => b[1].datetime.getTime() - a[1].datetime.getTime());

        // console.log(sortedNotifications)

        const groupByDateNotifications = groupByDate(sortedNotifications);

        const notificationElements = Object.entries(groupByDateNotifications).map(([date, notifications]) => {
            return notifications.map((notification, index) => {

                return (
                    <li key={notification.id}>
                        <DateBar date={date} isFirstNotification={index === 0} />
                        <NotificationCard notification={notification} setNotificationData={setNotificationData} />
                    </li>
                )
            })
        })

        setNotificationItems(notificationElements);

    }, [notificationData, contactData, setNotificationData]);


    async function handleClearAllClick() {
        try {
            setPrimaryButtonLoading(true);
            const response = await fetch(config.serverURL + `/api/clearallnotifications`, {
                method: 'post',
                headers: {
                    Authorization: token
                }
            });

            if (!response.ok) {
                return;
            }
            const data = await response.json();

            setNotificationData([]);
        }
        catch (e) {

        }
        finally {
            setPrimaryButtonLoading(false);
        }
    }


    return (
        <>
            {
                notificationData.length > 0 ? <NotificationButton onButtonClick={handleClearAllClick} text={"Clear all"} isLoading={primaryButtonLoading} />
                    : <div className="flex flex-col items-center">
                        <div className="flex justify-center">
                            <NothingFoundIcon />
                        </div>
                        <div className="text-xl">
                            No notifications
                        </div>
                    </div>
            }
            <ul className="w-full">
                {notificationItems}

            </ul>
        </>
    )
}

export default NotificationPane;