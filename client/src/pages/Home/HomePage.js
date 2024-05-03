import { useContext, useEffect, useRef, useState } from "react";
import ContactPane from "./ContactPane/ContactPane";
import ChatPane from "./ChatPane/ChatPane";
import WelcomePane from "./WelcomePane/WelcomePane";

import pfp from '../../images/pfp.jpg';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/AuthContext";
import { initSocketIo, socket } from "../../sio";

import config from "../../config";


function HomePage({ isMobileScreen, isDarkMode, setIsDarkMode, setIsLoading }) {
    const { token } = useContext(AuthContext);

    const [isIoConnected, setIsIoConnected] = useState(true);

    const navigate = useNavigate();

    const [activeContactData, setActiveContactData] = useState({ id: null, name: null, username: null, pfp: null, isOnline: null, lastSeen: null });
    const [isChatActive, setIsChatActive] = useState(false);

    const [chatData, setChatData] = useState({});
    const [notificationData, setNotificationData] = useState([]);

    const [contactData, setContactData] = useState([]);

    const [activeContact, setActiveContact] = useState(null);

    const [isNewMessage, setIsNewMessage] = useState(true);

    const [showContactPaneSpinner, setShowContactPaneSpinner] = useState(false);

    const [friendRequests, setFriendRequests] = useState([]);

    const messageTransferredRef = useRef(false);

    useEffect(()=>{
        if(socket?!socket.connected:true){
            initSocketIo(token);
        }

        if(socket?socket.connected:true){
            socket.emit('setIsOnline');
        }
    }, [token, socket]);

    useEffect(() => {
        socket.on('newFriend', (data) => {
            // console.log(contactData);

            setContactData((prevContactData) => {
                // console.log(data)
                return [...prevContactData, {
                    id: data._id,
                    username: data.username,
                    name: data.name,
                    pfp: (data.pfp) ? (data.pfp) : (pfp),
                    messagePageIndex: 0
                }]
            });
        });

        socket.on('receiveMessage', (data) => {
            // console.log(chatData)
            // console.log(data)
            const message = data;
            let latestMessageId = 0;
            if (chatData[message.isMyMessage ? message.receiver : message.sender]) {
                const messageIds = Object.keys(chatData[message.isMyMessage ? message.receiver : message.sender]);
                latestMessageId = parseInt(messageIds[messageIds.length - 1]);
                console.log(latestMessageId)
            }
            const messageID = latestMessageId + 1;

            // console.log(chatData)
            if(!message.isConnectionMsg){
                socket.emit('deliverMessage', {
                    messageId: message.messageId,
                    sender: message.sender,
                    deliveredDatetime: new Date()
                });
            }

            setChatData((prevChatData) => {
                return (
                    {
                        ...prevChatData,
                        [message.isMyMessage ? message.receiver : message.sender]: {
                            ...prevChatData[message.isMyMessage ? message.receiver : message.sender],
                            [messageID]:
                            {
                                'messageId': message._id,
                                message: message.message,
                                sendingDatetime: new Date(message.sendingDatetime),
                                sentDatetime: new Date(message.sentDatetime),
                                isMyMessage: message.isMyMessage,
                                status: message.status,
                                isRead: message.status==='read',
                                isConnectionMsg: message.isConnectionMsg
                            }
                        }
                    }
                )
            });

            messageTransferredRef.current = true;

            setIsNewMessage(true);
        });


        socket.on('sendMessageConfirmed', (data) => {
            // change message status according to messageId
            const id = data.id;
            const messageId = data.messageId;
            const receiver = data.receiver;
            const status = data.status;
            const sentDatetime = data.sentDatetime;
            const sendingDatetime = data.sendingDatetime;

            // console.log(chatData)

            setChatData((prevChatData) => {
                const updatedConversation = {
                    ...prevChatData[receiver],
                    [id]: {
                        ...prevChatData[receiver][id],
                        status: status,
                        messageId: messageId,
                        isRead: status==='read',
                        sentDatetime: new Date(sentDatetime),
                        sendingDatetime: new Date(sendingDatetime)
                    }
                }
    
                return {
                    ...prevChatData,
                    [receiver]: updatedConversation
                }
            });
            
        })

        socket.on('deliveredStatusChange', (data) => {
            const messageId = data.messageId;
            const receiver = data.receiver;
            const status = data.status;
            const deliveredDatetime = new Date(data.deliveredDatetime);


            setChatData((prevChatData) => {
                const targetMessageEntry = Object.entries(prevChatData[receiver]).find((msg)=>msg[1].messageId===messageId);
                const id = targetMessageEntry[0];

                const updatedConversation = {
                    ...prevChatData[receiver],
                    [id]: {
                        ...prevChatData[receiver][id],
                        status: status,
                        isRead: status==='read',
                        deliveredDatetime: deliveredDatetime
                    }
                }
    
                return {
                    ...prevChatData,
                    [receiver]: updatedConversation
                }
            });
        });

        socket.on('readStatusChange', (data) => {
            const receiver = data.receiver;
            const status = data.status;
            const readDatetime = new Date(data.readDatetime);

            
            setChatData((prevChatData) => {

                let updatedConversation;
                try{

                    updatedConversation = Object.fromEntries(
                        Object.entries(prevChatData[receiver]).map(([id, message])=>{
                            if(message.isMyMessage){
                                return [id, {...message, isRead: status==='read', status: status, readDatetime: readDatetime}];
                            }
                            return [id, message];
                        })
                    )
                }
                catch(e){
                    updatedConversation = {};
                }
    
                return {
                    ...prevChatData,
                    [receiver]: updatedConversation
                }
            });
        });

        socket.on('readMessageConfirmed', (data) => {
            const sender = data.sender;
            const status = data.status;
            const readDatetime = new Date(data.readDatetime);

            setIsNewMessage(false);


            setChatData((prevChatData) => {

                const updatedConversation = Object.fromEntries(
                    Object.entries(prevChatData[sender]).map(([id, message])=>{
                        if(!message.isMyMessage){
                            return [id, {...message, isRead: status==='read', status: status, readDatetime: readDatetime}];
                        }
                        return [id, message];
                    })
                )
    
                return {
                    ...prevChatData,
                    [sender]: updatedConversation
                }
            });
        });


        socket.on('deliverMessageConfirmed', (data) => {
            const sender = data.sender;
            const status = data.status;
            const deliveredDatetime = new Date(data.deliveredDatetime);

            setChatData((prevChatData) => {

                const updatedConversation = Object.fromEntries(
                    Object.entries(prevChatData[sender]).map(([id, message])=>{
                        if(!message.isMyMessage && (!message.isRead && message.status!='sending')){
                            return [id, {...message, isRead: status==='read', status: status, deliveredDatetime: deliveredDatetime}];
                        }
                        return [id, message];
                    })
                )
    
                return {
                    ...prevChatData,
                    [sender]: updatedConversation
                }
            });
        });


        socket.on('deliveredStatusChangeAll', (data) => {
            const receiver = data.receiver;
            const status = data.status;
            const deliveredDatetime = new Date(data.deliveredDatetime);

            if(contactData.some(contact=>contact.id===receiver)){
                setChatData((prevChatData) => {
    
                    let updatedConversation;
                    try{

                        updatedConversation = Object.fromEntries(
                            Object.entries(prevChatData[receiver]).map(([id, message])=>{
                                if(message.isMyMessage && (!message.isRead && message.status!='sending')){
                                    return [id, {...message, isRead: status==='read', status: status, deliveredDatetime: deliveredDatetime}];
                                }
                                return [id, message];
                            })
                        )
                    }
                    catch(e){
                        updatedConversation = {};
                    }
        
                    return {
                        ...prevChatData,
                        [receiver]: updatedConversation
                    }
                });
            }
        });


        socket.on('changeIsOnline', (data)=>{
            const sender = data.sender;
            const isOnline = data.isOnline;
            const lastSeen = data.lastSeen;

            if(contactData.some(contact=>contact.id===sender)){
                setContactData((prevContactData)=>{
                    let updatedContact = contactData.find(contact=>contact.id===sender);
                    updatedContact.isOnline = isOnline;
                    updatedContact.lastSeen = lastSeen;

                    const prevContactDataFiltered = [...prevContactData].filter(contact=>contact.id!==sender);

                    return [
                        ...prevContactDataFiltered,
                        updatedContact
                    ]
                });

                if(activeContactData.id===sender){
                    setActiveContactData({...activeContactData, isOnline, lastSeen})
                }
            }
        });



        return () => {
            socket.off('newFriend');
            socket.off('receiveMessage');
            socket.off('sendMessageConfirmed');
            socket.off('deliveredStatusChange');
            socket.off('readStatusChange');
            socket.off('readMessageConfirmed');
            socket.off('deliverMessageConfirmed');
            socket.off('deliveredStatusChangeAll');
            socket.off('changeIsOnline');
        }
    }, [chatData, contactData]);


    useEffect(() => {

        async function getFriends() {
            try{
                setShowContactPaneSpinner(true);
                const response = await fetch(config.serverURL + '/api/getfriends', {
                    method: 'get',
                    headers: {
                        'Authorization': token
                    }
                })
    
                const data = await response.json();
    
                if (response.ok) {
                    let friendsData = [];
                    data.friends.forEach(friend => {
                        friendsData.push({
                            id: friend._id,
                            username: friend.username,
                            name: friend.name,
                            pfp: (friend.pfp) ? (friend.pfp) : (pfp),
                            about: friend.about,
                            isOnline: friend.isOnline,
                            lastSeen: friend.lastSeen,
                            messagePageIndex: 0
                        });
                    });
                    setContactData(friendsData);
                }
            }
            catch(e){

            }
            finally{
                setShowContactPaneSpinner(false);
            }
        }

        async function getMessages() {
            const response = await fetch(config.serverURL + '/api/getmessages', {
                method: 'get',
                headers: {
                    'Authorization': token
                }
            })

            const data = await response.json();

            if (response.ok) {
                let messagesData = {};
                data.messages.forEach(message => {

                    let latestMessageId = 0;
                    if (messagesData[message.isMyMessage ? message.receiver : message.sender]) {
                        const messageIds = Object.keys(messagesData[message.isMyMessage ? message.receiver : message.sender]);
                        latestMessageId = messageIds[messageIds.length-1]
                    }
                    const messageID = parseInt(latestMessageId) + 1;


                    messagesData = {
                        ...messagesData,
                        [message.isMyMessage ? message.receiver : message.sender]: {
                            ...messagesData[message.isMyMessage ? message.receiver : message.sender],
                            [messageID]:
                            {
                                'messageId': message._id,
                                message: message.message,

                                sendingDatetime: new Date(message.sendingDatetime),
                                sentDatetime: new Date(message.sentDatetime),
                                deliveredDatetime: new Date(message.deliveredDatetime),
                                readDatetime: new Date(message.readDatetime),

                                isMyMessage: message.isMyMessage,
                                status: message.status,
                                isRead: message.status==='read'?true:false,
                                isConnectionMsg: message.isConnectionMsg
                            }
                        }
                    };

                });

                socket.emit('deliverMessageAll', {
                    deliveredDatetime: new Date()
                });

                setChatData(messagesData);
            }
        }

        getFriends();
        getMessages();


        setNotificationData({

            1: { "receiverID": 4, "senderID": 3, "notification_type": "friend_request_accepted", "datetime": new Date('2024-02-16T12:30:00+05:30'), "isRead": false },
            2: { "receiverID": 4, "senderID": 2, "notification_type": "friend_request_accepted", "datetime": new Date('2024-02-17T10:30:00+05:30'), "isRead": false },

            3: { "receiverID": 4, "senderID": 1, "notification_type": "friend_request_accepted", "datetime": new Date('2024-02-17T14:30:00+05:30'), "isRead": false },

        })


        return ()=>{
            socket.off('deliverMessageAll');
        }
    }, [])


    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [token])

    return (
        <div className="flex flex-row w-screen h-full">
            {
                (token) ?
                    (isIoConnected) ?
                        (
                            <>
                                <ContactPane friendRequests={friendRequests} setFriendRequests={setFriendRequests} showSpinner={showContactPaneSpinner} setShowSpinner={setShowContactPaneSpinner} contactData={contactData} chatData={chatData} onContactClick={setActiveContactData} onIsChatActive={setIsChatActive} isChatActive={isChatActive} isMobileScreen={isMobileScreen} activeContactData={activeContactData} notificationData={notificationData} setNotificationData={setNotificationData} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} setIsLoading={setIsLoading} activeContact={activeContact} setActiveContact={setActiveContact} />
                                <ChatPane friendRequests={friendRequests} setFriendRequests={setFriendRequests} chatData={chatData} setChatData={setChatData} activeContactData={activeContactData} isMobileScreen={isMobileScreen} onIsChatActive={setIsChatActive} isChatActive={isChatActive} setActiveContact={setActiveContact} isNewMessage={isNewMessage} setIsNewMessage={setIsNewMessage} contactData={contactData} setContactData={setContactData} messageTransferredRef={messageTransferredRef} />
                                <WelcomePane isChatActive={isChatActive} />
                            </>
                        )
                        :
                        (<div>Connecting...</div>)
                    :
                    ('')
            }

        </div>

    )
}

export default HomePage;