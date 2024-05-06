import { useRef, useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../../components/AuthContext";
import HelpIcon from "./components/HelpIcon";
import DarkModeIcon from "../../../../components/common/DarkModeIcon";
import LogoutIcon from "../../components/common/LogoutIcon";
import ProfilePicture from "../../components/common/ProfilePicture";

import ProfilePaneBody from "../ProfilePane/ProfilePaneBody";
import InnerSideBar from "./InnerSideBar";
import HelpPaneBody from "./HelpPane/HelpPaneBody";
import LightModeIcon from "../../../../components/common/LightModeIcon";
import { useNavigate } from "react-router-dom";
import SettingsCard from "./components/SettingsCard";


function ToggleButton({isOn}) {
    return (
        <div className={`h-6 w-14 ${isOn?'bg-dark-bigButtonNormal':'bg-dark-line'} rounded-full border dark:border-white border-black`}>
            <div className={`w-2/5 h-full bg-white rounded-full ${isOn ? 'ml-[60%]' : 'ml-0'} transition-all duration-100`}></div>
        </div>
    )
}


function ToggleThemeCard({ text, icon, isDarkMode, onToggleThemeClick }) {
    return (
        <div onClick={onToggleThemeClick} className={`flex flex-row justify-between items-center cursor-pointer border-b-2 border-light-line dark:border-dark-line p-5 hover:bg-light-hover2 dark:hover:bg-dark-hover2`}>
            <div className="flex">
                <div>
                    {icon}
                </div>
                <div className="ml-4">
                    {text}
                </div>

            </div>

            <ToggleButton isOn={isDarkMode} />

        </div>
    )
}


function SettingsPaneBody({ userData, onProfileInputConfirmClick, isDarkMode, setIsDarkMode }) {
    const { token, clearGlobalToken } = useContext(AuthContext);

    const navigate = useNavigate();

    const [openedPane, setOpenedPane] = useState('');

    const isDarkModeRef = useRef(isDarkMode);


    function handleCardClick(paneName) {
        setOpenedPane(paneName);
    }

    function handleBackClick() {
        setOpenedPane('');
    }

    function handleToggleThemeClick() {

        setIsDarkMode((prevIsDarkMode) => {
            isDarkModeRef.current = !prevIsDarkMode;
            return !prevIsDarkMode;
        });
    }

    function handleLogoutClick() {
        clearGlobalToken();
        navigate('/login');
    }

    return (
        <>
            <div className="w-full">

                <div onClick={() => handleCardClick('profile')} className="p-5 pl-2 flex items-center cursor-pointer border-b-2 border-light-line dark:border-dark-line p-5 hover:bg-light-hover2 dark:hover:bg-dark-hover2">
                    <ProfilePicture img={userData.pfp} isBig={true} />
                    <div className="ml-2">
                        <div className="text-lg font-bold">
                            {userData.username}
                        </div>
                        <div className="whitespace-pre-wrap text-sm break-words">
                            {userData.about}
                        </div>
                    </div>
                </div>

                <ToggleThemeCard text={'Dark Mode'} icon={isDarkModeRef.current ? <DarkModeIcon /> : <LightModeIcon />} isDarkMode={isDarkModeRef.current} onToggleThemeClick={handleToggleThemeClick} />

                <SettingsCard text={'Help'} icon={<HelpIcon />} onCardClick={handleCardClick} />
                <SettingsCard text={'Logout'} icon={<LogoutIcon />} onCardClick={handleLogoutClick} isDanger={true} />
            </div>


            <InnerSideBar onBackClick={handleBackClick} isPaneOpen={openedPane === 'profile'} paneTitle={'Profile'} paneBody={<ProfilePaneBody userData={userData} onInputConfirmClick={onProfileInputConfirmClick} />} />
            <InnerSideBar onBackClick={handleBackClick} isPaneOpen={openedPane === 'help'} paneTitle={'Help'} paneBody={<HelpPaneBody />} />

        </>
    )
}

export default SettingsPaneBody;