import UserCard from "../components/UserCard";
import pfp from "../../../../../images/pfp.jpg";
import { useContext, useEffect, useState } from "react";
import UserProfilePane from "../components/UserProfilePane/UserProfilePane";
import config from "../../../../../config";
import { AuthContext } from "../../../../../components/AuthContext";
import Spinner from "../../../../../components/common/Spinner";
import RequestCard from "./RequestCard";
import { socket } from "../../../../../sio";
import { NothingFoundDiv } from "../../../../../components/common/NothingFoundDiv";
import { NoFriendsIcon } from "../../../ContactPane/components/NoFriendsIcon";

function FriendRequestsPane({ friendRequests, setFriendRequests, showSpinner, setShowSpinner, clickedUserID, setClickedUserID, setIsUserProfilePaneOpen, setClickedUser }) {

    useEffect(() => {
        socket.on('requestReceived', (data) => {
            setFriendRequests((prevFriendRequests) => [...prevFriendRequests, data]);
        })

        socket.on('requestCanceled', (data) => {
            setFriendRequests((prevFriendRequests) => {
                return prevFriendRequests.filter((friendRequest) => friendRequest._id !== data.id)
            });
        })

        socket.on('unfriended', (data) => {
            setFriendRequests((prevFriendRequests) => {
                return prevFriendRequests.filter((friendRequest) => friendRequest._id !== data.id)
            });
        })

        socket.on('requestAcceptConfirmed', (data) => {
            setFriendRequests((prevFriendRequests) => {
                return prevFriendRequests.filter((friendRequest) => friendRequest._id !== data.id)
            });
        })

        socket.on('requestRejectConfirmed', (data) => {
            setFriendRequests((prevFriendRequests) => {
                return prevFriendRequests.filter((friendRequest) => friendRequest._id !== data.id)
            });
        })

        return () => {
            socket.off('requestReceived');
            socket.off('requestCanceled');
            socket.off('requestAcceptConfirmed');
            socket.off('requestRejectConfirmed');

            socket.off('unfriended');
        }
    }, [])


    function handleUserCardClick(id) {
        setIsUserProfilePaneOpen(true);
        setClickedUserID(id);
        setClickedUser(friendRequests.find((user) => user._id === id) ? friendRequests.find((user) => user._id === id) : {});
    }

    useEffect(() => {
        console.log(friendRequests)
    }, [friendRequests])

    return (
        <>
            <div className="w-full">


                {showSpinner && <div className="mt-2 overflow-hidden"><Spinner /></div>}

                {
                    friendRequests.length <= 0
                        ? <NothingFoundDiv text={'No friend requests'} icon={<NoFriendsIcon />} />
                        :
                        <div>
                            {
                                friendRequests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((user, index) => {
                                    return <RequestCard key={user._id} id={user._id} username={user.username} name={user.name} requestCreatedAt={user.createdAt} pfp={user.pfp ? user.pfp : pfp} onUserCardClick={handleUserCardClick} setFriendRequests={setFriendRequests} />
                                })
                            }
                        </div>
                }


            </div>

        </>
    )
}

export default FriendRequestsPane;