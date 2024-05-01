import UserProfilePaneBodyTop from "./UserProfilePaneBodyTop";
import UserProfilePaneBodyBottom from "./UserProfilePaneBodyBottom";
import UserProfilePaneAbout from "./UserProfilePaneAbout";
import { useContext, useEffect, useState } from "react";
import config from "../../../../../../config";
import { AuthContext } from "../../../../../../components/AuthContext";
import { socket } from "../../../../../../sio";


function UserProfileContainer({children}){
    return (
        <div className="flex flex-col py-2 border-b-2 border-light-line dark:border-dark-line">
            {children}
        </div>
    )
}


function UserProfilePaneBody({user, onAddFriendClick, setFriendRequests}){
    const {token} = useContext(AuthContext);

    const [userMetaData, setUserMetaData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        socket.on('requestAccepted', (data)=>{
            setUserMetaData(data);
        });

        socket.on('requestRejected', (data)=>{
            setUserMetaData(data);
        });

        return ()=>{
            socket.off('requestAccepted');
        }
    }, [])

    
    useEffect(()=>{
        async function getUserData(){
            setIsLoading(true);

            const response = await fetch(config.serverURL+'/api/getuserprofiledata', {
                method: 'post',
                headers: {
                    'Authorization': token,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({friendId: user._id})
            })

            if(!response.ok){
                return;
            }
            const data = await response.json();

            // console.log(data)
            
            setIsLoading(false);
            setUserMetaData(data);

        }

        getUserData();
    }, [user._id]);
    
    useEffect(()=>{
        console.log(isLoading)
    }, [isLoading])

    return (
        <>
            <UserProfileContainer>
                <UserProfilePaneBodyTop user={user} onAddFriendClick={onAddFriendClick} userMetaData={userMetaData} setUserMetaData={setUserMetaData} setFriendRequests={setFriendRequests} isLoading={isLoading} />

                <UserProfilePaneAbout about={user.about} />
            </UserProfileContainer>

            <UserProfileContainer>
                <UserProfilePaneBodyBottom userMetaData={userMetaData} isLoading={isLoading} />
            </UserProfileContainer>
            
        </>
    )
}

export default UserProfilePaneBody;