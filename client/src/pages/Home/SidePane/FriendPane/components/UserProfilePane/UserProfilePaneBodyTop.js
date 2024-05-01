import ProfilePicture from "../../../../components/common/ProfilePicture";
import pfp from "../../../../../../images/pfp.jpg";
import Button from "../Button";
import { useState, useEffect } from "react";
import { socket } from "../../../../../../sio";
import OpenablePfp from "../../../../../../components/common/OpenablePfp";

function Profile({ username, pfp }) {
    return (
        <div className="flex flex-col items-start relative">
            {/* <ProfilePicture img={pfp} isBig={true} /> */}
            <OpenablePfp img={pfp} />

            <div className="font-bold my-1 text-center w-full">
                {username}
            </div>
        </div>
    )
}

function UserProfilePaneBodyTop({ user, userMetaData, onAddFriendClick, setUserMetaData, setFriendRequests, isLoading }) {

    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const [isSecondButtonLoading, setIsSecondButtonLoading] = useState(false);

    useEffect(() => {
        socket.on('requestSentConfirmedInner', (data) => {
            setUserMetaData((prevUserMetaData) => {
                return {
                    ...prevUserMetaData,
                    isFriend: false,
                    isPending: true
                }
            });

            setIsButtonLoading(false);
        })

        socket.on('requestAcceptConfirmedInner', (data) => {
            setUserMetaData(data);


            setIsButtonLoading(false);
        })

        socket.on('requestRejectConfirmedInner', (data) => {
            setUserMetaData(data);


            setIsSecondButtonLoading(false);
        })

        socket.on('requestReceivedInner', (data) => {
            if (data.request._id === user._id) {
                setUserMetaData(data.metaData);
            }

            setIsSecondButtonLoading(false);
        })

        socket.on('requestCancelConfirmed', (data) => {
            setUserMetaData(data);

            setIsSecondButtonLoading(false);
        })

        socket.on('requestCanceledInner', (data) => {
            if (data.request._id === user._id) {
                setUserMetaData(data.metaData);
            }

            setIsSecondButtonLoading(false);
        })

        return () => {
            socket.off('requestSentConfirmedInner');
            socket.off('requestAcceptConfirmedInner');
            socket.off('requestRejectConfirmedInner');
            socket.off('requestReceivedInner');
            socket.off('requestCancelConfirmed');
            socket.off('requestCanceledInner');
        }
    }, []);

    async function handleAddFriendClick() {
        setIsButtonLoading(true);
        await onAddFriendClick();
    }

    async function handleAcceptClick(e) {
        e.stopPropagation();

        try {
            setIsButtonLoading(true);

            socket.emit('acceptRequest', { friendId: user._id });

        }
        catch (e) {

            setIsButtonLoading(false);
        }
    }

    async function handleRejectClick(e) {
        e.stopPropagation();

        try {
            setIsSecondButtonLoading(true);

            socket.emit('rejectRequest', { friendId: user._id });

        }
        catch (e) {

            setIsSecondButtonLoading(false);
        }
    }

    async function handleCancelClick(e) {
        e.stopPropagation();

        try {
            setIsSecondButtonLoading(true);

            socket.emit('cancelRequest', { friendId: user._id });

        }
        catch (e) {

            setIsSecondButtonLoading(false);
        }
    }


    return (
        <div className="flex flex-col">

            <div className="border-b-2 border-b-dark-line pb-4 mb-2">
                <div className="flex justify-center w-full">
                    <Profile username={user.username} pfp={user.pfp ? user.pfp : pfp} />
                </div>


                <div className="flex text-sm justify-center flex-wrap">
                    {
                        (isButtonLoading || isLoading) ?
                            <Button isConfirm={true} isLoading={true} />
                            :
                            (userMetaData.isFriend) ? <Button text={'Friends'} onButtonClick={() => ''} isConfirm={true} />
                                : (userMetaData.isPending) ? <Button text={'Sent'} onButtonClick={() => ''} isConfirm={true} />
                                    : (userMetaData.isPendingByMe) ? <Button text={'Accept'} onButtonClick={handleAcceptClick} isConfirm={true} />
                                        : <Button text={'Add'} onButtonClick={handleAddFriendClick} isConfirm={true} />
                    }
                    {
                        (userMetaData.createdAt === null || userMetaData.createdAt === undefined || isSecondButtonLoading) ?
                            (isSecondButtonLoading) ? <Button isConfirm={false} isLoading={true} />
                                : <div />
                            :
                            (userMetaData.isFriend) ? <Button text={'Unfriend'} onButtonClick={() => ''} />
                                : (userMetaData.isPending) ? <Button text={'Cancel'} onButtonClick={handleCancelClick} />
                                    : (userMetaData.isPendingByMe) ? <Button text={'Reject'} onButtonClick={handleRejectClick} />
                                        : <div />
                    }
                </div>
            </div>

            <div className="flex flex-col">
                <div className="text-lg font-bold">
                    {user.name}
                </div>
            </div>



        </div>
    )
}

export default UserProfilePaneBodyTop;