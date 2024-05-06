import OptionCard from "./OptionCard";

import UserIcon from "./UserIcon";
import AboutIcon from "./AboutIcon";
import { useState, useEffect, useRef } from "react";
import ProfilePfp from "./ProfilePfp";
import Spinner from "../../../../components/common/Spinner";


function ProfilePaneBody({userData, onInputConfirmClick}){

    const [profileData, setProfileData] = useState({});
    const [showSpinner, setShowSpinner] = useState(false);

    useEffect(()=>{
        setProfileData((prevProfileData)=>{
            return {
                ...prevProfileData,
                name: userData.name,
                about: userData.about,
                pfp: userData.pfp
            }
        })
    }, [userData]);

    function handleOptionChange(name, value){
        setProfileData((prevProfileData)=>{
            return {
                ...prevProfileData,
                [name]: value
            }
        })
    }

    async function handleConfirmClick(name, value){
        setShowSpinner(true);
        await onInputConfirmClick(name, value, profileData);
        setShowSpinner(false);
    }

    

    return (
        <>
            <div className="w-full">
                <div className="border-b-2 border-light-line dark:border-dark-line">
                    
                    <ProfilePfp pfp={userData.pfp} onConfirmClick={handleConfirmClick} />

                </div>

                {
                    showSpinner && <Spinner/>
                }

                <div className="transition-all duration-500">
                    <OptionCard name={'Username'} value={userData.username} icon={<UserIcon />} isEditable={false} />
                    <OptionCard name={'Name'} value={profileData.name} icon={<UserIcon />} isEditable={true} onOptionChange={handleOptionChange} onConfirmClick={handleConfirmClick} />
                    <OptionCard name={'About'} value={profileData.about} icon={<AboutIcon />} isEditable={true}  onOptionChange={handleOptionChange} onConfirmClick={handleConfirmClick} />
                </div>
            </div>
        </>
    )
}

export default ProfilePaneBody;