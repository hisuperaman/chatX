import { useEffect, useRef } from "react";
import SidePaneTopBar from "../../../SidePaneTopBar";
import { CSSTransition } from "react-transition-group";
import UserProfilePaneBody from "./UserProfilePaneBody"
import { socket } from "../../../../../../sio";

function UserProfilePane({user, clickedUserID, onBackClick, isUserProfilePaneOpen, setIsUserProfilePaneOpen, setFriendRequests, openedByChatPane, isMobileScreen}){
    
    const paneRef = useRef(null);

    async function handleAddFriendClick() {
        socket.emit('addFriend', {friendId: clickedUserID});
    }

    useEffect(()=>{
        document.body.style.overflow = 'hidden';

        return ()=>{
            document.body.style.overflow = 'auto';
        }
    }, [isUserProfilePaneOpen])

    return (
        <CSSTransition
            in={isUserProfilePaneOpen}
            unmountOnExit
            timeout={100}
            classNames={`${openedByChatPane && !isMobileScreen?'user-profile-chat-pane':'user-profile-pane'}`}
            nodeRef={paneRef}
        >
            <div ref={paneRef} className={`absolute top-0 overflow-x-hidden flex h-full flex-col ${openedByChatPane && !isMobileScreen?'w-3/5 right-0 border-l-2 border-light-line dark:border-dark-line':'w-full left-0'}`}>
                <SidePaneTopBar paneTitle={user.username} onBackClick={onBackClick} />

                <div className='flex flex-col overflow-y-auto bg-light-primary dark:bg-dark-primary h-full p-2'>
                    <UserProfilePaneBody user={user} onAddFriendClick={handleAddFriendClick} setFriendRequests={setFriendRequests} />
                </div>

            </div>
        </CSSTransition>
    )
}

export default UserProfilePane;