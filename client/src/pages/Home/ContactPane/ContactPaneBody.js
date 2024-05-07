import ContactCard from "./ContactCard";
import { useEffect, useState, useRef } from "react";
import Spinner from '../../../components/common/Spinner';
import { NothingFoundDiv } from "../../../components/common/NothingFoundDiv";
import { NoFriendsIcon } from "./components/NoFriendsIcon";

function ContactPaneBody({ showSpinner, contactData, chatData, activeContactData, onContactClick, onIsChatActive, isChatActive, activeContact, setActiveContact, searchQuery }) {

    const [prevChatData, setPrevChatData] = useState(chatData);
    const [newMsgContactIDs, setNewMsgContactIDs] = useState([]);

    const prevChatDataRef = useRef();

    const [contactCardData, setContactCardData] = useState([]);
    const [sortedContactCardData, setSortedContactCardData] = useState([]);

    useEffect(() => {
        prevChatDataRef.current = prevChatData;
    }, [prevChatData]);


    useEffect(() => {

        const contactIDs = [];

        if (chatData) {

            Object.keys(chatData).forEach(contactID => {

                if (Object.keys(prevChatDataRef.current).length > 0) {
                    const prevContactChat = Object.keys(prevChatDataRef.current[contactID] || {}).length;
                    const newContactChat = Object.keys(chatData[contactID] || {}).length;

                    if (prevContactChat !== newContactChat) {
                        // console.log(prevChatData)
                        contactIDs.push(contactID);
                    }
                }

            })
        }

        if (sortedContactCardData && sortedContactCardData.length > 0) {
            if (!contactIDs.includes("" + sortedContactCardData[0].id)) {
                contactIDs.push("" + sortedContactCardData[0].id);
            }
            setNewMsgContactIDs(contactIDs);
        }
        // console.log(sortedContactCardData)

        setPrevChatData(chatData);

    }, [chatData, contactCardData, sortedContactCardData])


    useEffect(() => {
        if (activeContact) {
            onIsChatActive(true);
        }
    }, [activeContact, onIsChatActive])

    useEffect(() => {
        if (!isChatActive) {
            setActiveContact(null);
        }
    }, [isChatActive])

    function getUnreadMsgCount(messages) {
        let unreadCount = 0;
        for (const messageID in messages) {
            if (!messages[messageID].isRead && !messages[messageID].isMyMessage) {
                unreadCount++;
            }
        }
        return unreadCount;
    }

    useEffect(() => {
        setContactCardData(contactData.map((contact, index) => {
            let lastMsg = {
                message: 'Loading...',
                sendingDatetime: new Date()
            };
            if (chatData[contact.id]) {
                // lastMsg = (Object.keys(chatData).length > 0) ? chatData[contact.id][Object.keys(chatData[contact.id])[Object.keys(chatData[contact.id]).length - 1]] : (null);
                lastMsg = (Object.keys(chatData).length > 0) ? Object.values(chatData[contact.id]).sort((a, b) => a.sendingDatetime.getTime() - b.sendingDatetime.getTime())[Object.keys(chatData[contact.id]).length - 1] : (null);
            }

            // console.log(lastMsg)
            // console.log(lastMsg)
            const updatedContact = {
                ...contact,
                'lastMsg': lastMsg,
                'unreadMsgCount': getUnreadMsgCount(chatData[contact.id]),
                'isActive': activeContact === contact.id,
            }
            return updatedContact;
        }))


    }, [chatData, contactData, activeContact])

    useEffect(() => {
        if (contactCardData) {
            if (searchQuery.length > 0) {
                setSortedContactCardData((prevSortedContactCardData) => {
                    const sortedContactData = contactCardData.sort((a, b) => {
                        const countA = (a.username.match(new RegExp('^' + searchQuery, 'i')) || []).length;
                        const countB = (b.username.match(new RegExp('^' + searchQuery, 'i')) || []).length;

                        return countB - countA;
                    })
                    return [...sortedContactData];
                });
            }
            else {
                // sorts the array in descending order so that latest active contact is at top
                setSortedContactCardData(contactCardData.sort((a, b) => b.lastMsg.sendingDatetime.getTime() - a.lastMsg.sendingDatetime.getTime()));
            }

        }
    }, [contactCardData, searchQuery]);


    return (
        <>
            {((sortedContactCardData.length <= 0 && contactData.length > 0) || showSpinner) ? (
                <div className="mt-3 overflow-hidden">
                    <Spinner />
                </div>
            )
                :

                sortedContactCardData.length <= 0
                    ? <NothingFoundDiv text={'No friends'} icon={<NoFriendsIcon />} />
                    : <ul className='flex flex-col overflow-y-auto'>

                        {sortedContactCardData.map((contact, index) => {
                            return (
                                <li key={contact.id}>
                                    {/* {console.log(newMsgContactIDs)} */}
                                    <ContactCard key={contact.id} hasNewMessages={newMsgContactIDs.includes(String(contact.id))} onContactClick={onContactClick} isUnfriend={contact.isUnfriend} onActive={setActiveContact} id={contact.id} isOnline={contact.isOnline} lastSeen={contact.lastSeen} username={contact.username} name={contact.name} about={contact.about} pfp={contact.pfp} lastMsg={contact.lastMsg} unreadMsgCount={contact.unreadMsgCount} isActive={contact.isActive} />
                                </li>
                            )
                        })}

                    </ul>
            }


        </>
    )
}

export default ContactPaneBody;