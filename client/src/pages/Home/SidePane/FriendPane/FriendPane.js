import { useRef, useState, useEffect, useContext } from "react";
import AddFriendPaneBody from "./AddFriendPane/AddFriendPaneBody";
import FriendRequestsPane from "./FriendRequestsPane/FriendRequestsPane";
import { CSSTransition } from "react-transition-group";
import UserProfilePane from "./components/UserProfilePane/UserProfilePane";
import config from "../../../../config";
import { AuthContext } from "../../../../components/AuthContext";

function TabButton({ text, tabIndex, activeTabIndex, onTabClick }) {
    const isActive = tabIndex === activeTabIndex;
    return (
        <div key={tabIndex} onClick={() => onTabClick(tabIndex)} className={`flex flex-col items-center w-1/2 py-2 cursor-default dark:active:bg-dark-secondary transition-[background-color] ease-in duration-100 ${isActive ? ('') : ('')}`}>
            <div className="">
                {text}
            </div>
        </div>
    )
}

function ActiveTabIndicator({ activeTabIndex }) {
    // console.log(activeTabIndex);
    return (
        <div className={`w-1/2 h-[2px] bg-light-button2Normal dark:bg-dark-button2Normal ${(activeTabIndex) === 0 ? ('absolute animate-slideLeft right-[50%]') : (activeTabIndex === 1 ? ('absolute animate-slideRight left-[50%]') : (''))}`}>

        </div>
    )
}

function FriendPane({friendRequests, setFriendRequests}) {
    const { token } = useContext(AuthContext);

    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const [isUserProfilePaneOpen, setIsUserProfilePaneOpen] = useState(false);

    const [clickedUserID, setClickedUserID] = useState(null);
    const [searchedUsers, setSearchedUsers] = useState([]);

    const [clickedUser, setClickedUser] = useState(null);

    const [showSpinner, setShowSpinner] = useState(false);

    useEffect(()=>{
        console.log(friendRequests)
    }, [friendRequests])

    const tabs = [
        <FriendRequestsPane friendRequests={friendRequests} setFriendRequests={setFriendRequests} showSpinner={showSpinner} setShowSpinner={setShowSpinner} clickedUserID={clickedUserID} setClickedUserID={setClickedUserID} setIsUserProfilePaneOpen={setIsUserProfilePaneOpen} setClickedUser={setClickedUser} />,
        <AddFriendPaneBody searchedUsers={searchedUsers} setSearchedUsers={setSearchedUsers} isUserProfilePaneOpen={isUserProfilePaneOpen} setIsUserProfilePaneOpen={setIsUserProfilePaneOpen} setClickedUserID={setClickedUserID} clickedUserID={clickedUserID} showSpinner={showSpinner} setShowSpinner={setShowSpinner} setClickedUser={setClickedUser} />
    ];


    useEffect(() => {

        async function fetchRequests() {
            setShowSpinner(true);

            try {
                const response = await fetch(config.serverURL + `/api/getfriendrequests`, {
                    method: 'get',
                    headers: {
                        Authorization: token
                    },
                });

                if (!response.ok) {
                    return;
                }
                const data = await response.json();

                console.log(data.friendRequests)
                
                setFriendRequests(data.friendRequests);
                // setFriendRequests([...data.friendRequests, ...data.friendRequests, ...data.friendRequests]);

            }
            catch (e) {

            }

            setShowSpinner(false);
        }

        fetchRequests();

    }, [token]);


    function handleTabClick(tabIndex) {
        setActiveTabIndex(tabIndex);
    }

    function handleUserProfileBackClick() {
        setIsUserProfilePaneOpen(false);
        setClickedUserID(null);
    }


    return (
        <>
            <div className="flex flex-col border-b border-light-line dark:border-dark-line">

                <div className="flex">
                    <TabButton text={'Requests'} tabIndex={0} activeTabIndex={activeTabIndex} onTabClick={handleTabClick} />
                    <TabButton text={'Add'} tabIndex={1} activeTabIndex={activeTabIndex} onTabClick={handleTabClick} />
                </div>
                <div className="">
                    <ActiveTabIndicator activeTabIndex={activeTabIndex} />
                </div>

            </div>

            <div className="overflow-y-auto">
                {
                    tabs.map((tab, index) => {
                        return (
                            <div key={index} className={`${index === activeTabIndex ? ('') : ('hidden')}`}>
                                {tab}
                            </div>
                        )
                    })
                }
            </div>

            <UserProfilePane user={clickedUser?clickedUser:{}} clickedUserID={clickedUserID} onBackClick={handleUserProfileBackClick} isUserProfilePaneOpen={isUserProfilePaneOpen} setIsUserProfilePaneOpen={setIsUserProfilePaneOpen} setFriendRequests={setFriendRequests} />


        </>
    )
}

export default FriendPane;