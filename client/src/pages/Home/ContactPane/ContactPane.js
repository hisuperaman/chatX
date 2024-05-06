import { useContext, useEffect, useState } from "react";
import ContactPaneTopBar from "./ContactPaneTopBar";
import ContactPaneBody from "./ContactPaneBody";
import SidePane from "../SidePane/SidePane";
import pfp from '../../../images/pfp.jpg';
import config from '../../../config.js';
import { AuthContext } from "../../../components/AuthContext";
import { socket } from "../../../sio";

function ContactPane({ showSpinner, setShowSpinner, contactData, chatData, onContactClick, isMobileScreen, activeContactData, onIsChatActive, isChatActive, notificationData, setNotificationData, isDarkMode, setIsDarkMode, setIsLoading, activeContact, setActiveContact, friendRequests, setFriendRequests, setContactData }) {
    const { token, clearGlobalToken } = useContext(AuthContext);

    const [clickedButton, setClickedButton] = useState(null);

    const [userData, setUserData] = useState({});

    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        async function getUserData() {
            try {
                const response = await fetch(config.serverURL + "/api/getuser", {
                    method: 'get',
                    headers: {
                        'Authorization': token
                    }
                })

                const data = await response.json();

                if (response.ok) {
                    setUserData({
                        username: data.username,
                        name: data.name,
                        pfp: (data.pfp) ? (data.pfp) : pfp,
                        email: data.email,
                        about: (data.about) ? (data.about) : ''
                    })
                }
                else {
                    if (data.tokenInvalid || data.tokenNotFound) {
                        clearGlobalToken();
                    }
                }
            }
            catch (e) {

            }
            finally {
                
            }
        }

        getUserData();
    }, [])

    function getNotificationCount(notifications) {
        let unreadCount = 0;
        Object.entries(notifications).forEach(([id, notification]) => {
            if (!notification.isRead) {
                unreadCount++;
            }
        });
        return unreadCount;
    }

    async function handleProfileInputConfirmClick(name, value, profileData) {

        const response = await fetch(config.serverURL + "/api/updateuser", {
            method: 'PATCH',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ [name]: value })
        })

        const data = await response.json();

        if (response.ok) {
            setUserData((prevUserData) => {
                return {
                    ...prevUserData,
                    ...profileData,
                    [name]: value,
                    pfp: name === 'pfp' ? (value ? value : pfp) : prevUserData.pfp
                }
            })
        }

    }

    return (
        <>
            <div className={`flex flex-col ${(isMobileScreen) ? 'w-full' : ('w-2/5')} ${(isChatActive && isMobileScreen) ? ('') : ('flex')}`}>
                <ContactPaneTopBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} onButtonClick={setClickedButton} notificationCount={getNotificationCount(notificationData)} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} setIsLoading={setIsLoading} userData={userData} setContactData={setContactData} />
                <ContactPaneBody searchQuery={searchQuery} showSpinner={showSpinner} contactData={contactData} chatData={chatData} activeContactData={activeContactData} onContactClick={onContactClick} onIsChatActive={onIsChatActive} isChatActive={isChatActive} activeContact={activeContact} setActiveContact={setActiveContact} />
            </div>

            <SidePane friendRequests={friendRequests} setFriendRequests={setFriendRequests} isMobileScreen={isMobileScreen} clickedButton={clickedButton} onBackClick={setClickedButton} notificationData={notificationData} setNotificationData={setNotificationData} contactData={contactData} userData={userData} onProfileInputConfirmClick={handleProfileInputConfirmClick} setIsLoading={setIsLoading} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />


        </>
    )
}

export default ContactPane;