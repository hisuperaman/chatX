import { useEffect, useState } from "react";
import NotificationPaneBody from "./NotificationPane/NotificationPaneBody";
import SidePaneTopBar from "./SidePaneTopBar";

import ProfilePaneBody from "./ProfilePane/ProfilePaneBody";
import FriendPane from "./FriendPane/FriendPane";
import SettingsPaneBody from "./SettingsPane/SettingsPaneBody";

function SidePane({isMobileScreen, clickedButton, onBackClick, notificationData, setNotificationData, contactData, userData, onProfileInputConfirmClick, setIsLoading, friendRequests, setFriendRequests, setIsDarkMode, isDarkMode}){
    const [paneData, setPaneData] = useState({paneTitle: null, paneBody: null});



    useEffect(()=>{
        if(clickedButton==="notification"){
            const paneTitle = "Notifications";
            const paneBody = <NotificationPaneBody notificationData={notificationData} setNotificationData={setNotificationData} contactData={contactData} />
            setPaneData({'paneTitle': paneTitle, 'paneBody': paneBody});
        }
        else if(clickedButton==="add"){
            const paneTitle = "Friends";
            const paneBody = <FriendPane friendRequests={friendRequests} setFriendRequests={setFriendRequests} />
            setPaneData({'paneTitle': paneTitle, 'paneBody': paneBody});
        }
        else if(clickedButton==="myprofile"){
            const paneTitle = "Profile";
            const paneBody = <ProfilePaneBody userData={userData} onInputConfirmClick={onProfileInputConfirmClick} />
            setPaneData({'paneTitle': paneTitle, 'paneBody': paneBody});
        }
        else if(clickedButton==="settings"){
            const paneTitle = "Settings";
            const paneBody = <SettingsPaneBody userData={userData} onProfileInputConfirmClick={onProfileInputConfirmClick} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
            setPaneData({'paneTitle': paneTitle, 'paneBody': paneBody});
        }
    }, [clickedButton, notificationData, setNotificationData, contactData, userData, friendRequests])

    return (
        <div className={`flex h-full flex-col ${(isMobileScreen)?'w-full':('w-2/5')} ${(clickedButton)?('absolute left-0'):('absolute -left-full')} transition-left duration-100`}>
            <SidePaneTopBar paneTitle={paneData.paneTitle} onBackClick={onBackClick} />

            <div className='flex flex-col overflow-y-auto bg-light-primary dark:bg-dark-primary h-full'>
                {paneData.paneBody}
            </div>

        </div>
    )
}

export default SidePane;