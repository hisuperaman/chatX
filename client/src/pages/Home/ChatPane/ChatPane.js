import { useEffect, useState } from "react";
import ChatPaneTopBar from './ChatPaneTopBar';
import ChatPaneBody from './ChatPaneBody';
import MessageBox from "./MessageBox";
import { socket } from "../../../sio";
import UserProfilePane from "../SidePane/FriendPane/components/UserProfilePane/UserProfilePane";

function ChatPane({chatData, setChatData, activeContactData, isMobileScreen, onIsChatActive, isChatActive, setActiveContact, isNewMessage, setIsNewMessage, friendRequests, setFriendRequests, contactData, setContactData, messageTransferredRef}){
    const [rows, setRows] = useState(1);

    const [isUserProfilePaneOpen, setIsUserProfilePaneOpen] = useState(false);


    function handleMessageSend(messageObj){
        const id = parseInt(Object.keys(chatData[activeContactData.id])[Object.keys(chatData[activeContactData.id]).length-1])+1;

        
        socket.emit('sendMessage', {receiver: activeContactData.id, messageObj: {...messageObj, id}});


        messageTransferredRef.current = true;

        setChatData((prevChatData) => {
            const updatedConversation = {
                ...prevChatData[activeContactData.id],
                [id]: messageObj
            }

            return {
                ...prevChatData,
                [activeContactData.id]: updatedConversation
            }
        });

        

        // console.log(chatData);
    }

    function handleUserProfileBackClick(){
        setIsUserProfilePaneOpen(false);
    }

    return (
        <div className={`flex flex-col bg-light-primary dark:bg-dark-primary ${(isMobileScreen)?'':('w-3/5 border-l-2 border-light-line dark:border-dark-line')} ${(isChatActive && isMobileScreen)?('absolute left-0 h-full w-full'):((isChatActive)?(''):('absolute -left-full h-full w-full'))} ${(isMobileScreen)?('transition-all duration-100'):('')}`}>
            <ChatPaneTopBar setIsUserProfilePaneOpen={setIsUserProfilePaneOpen} activeContactData={activeContactData} isMobileScreen={isMobileScreen} onIsChatActive={onIsChatActive} setActiveContact={setActiveContact} />
            <ChatPaneBody activeChatData={chatData[activeContactData.id]} activeContactData={activeContactData} setChatData={setChatData} MessageBoxRows={rows} isChatActive={isChatActive} chatData={chatData} isNewMessage={isNewMessage} setIsNewMessage={setIsNewMessage} contactData={contactData} setContactData={setContactData} messageTransferredRef={messageTransferredRef} />
            <MessageBox activeContactData={activeContactData} isMobileScreen={isMobileScreen} onSend={handleMessageSend} rows={rows} setRows={setRows} />

            <UserProfilePane isMobileScreen={isMobileScreen} openedByChatPane={true} user={activeContactData?{...activeContactData, _id: activeContactData.id}:{}} clickedUserID={activeContactData.id} onBackClick={handleUserProfileBackClick} isUserProfilePaneOpen={isUserProfilePaneOpen} setIsUserProfilePaneOpen={setIsUserProfilePaneOpen} setFriendRequests={setFriendRequests} />
          

        </div>
    )
}

export default ChatPane;