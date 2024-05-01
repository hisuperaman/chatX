import { useNavigate } from "react-router-dom";
import MenuItem from "../components/common/MenuItem";
import { useContext } from "react";
import { AuthContext } from "../../../components/AuthContext";
import DarkModeIcon from "../../../components/common/DarkModeIcon";
import LightModeIcon from "../../../components/common/LightModeIcon";
import SettingsIcon from "../components/common/SettingsIcon";
import LogoutIcon from "../components/common/LogoutIcon";

function ContactPaneMenuItems({ setIsLoading, onButtonClick, setIsDropdownOpen }) {

    const navigate = useNavigate();

    const { clearGlobalToken } = useContext(AuthContext);

    function handleLogoutClick() {
        setIsDropdownOpen(false);
        clearGlobalToken();
        navigate('/login');
    }

    function handleSettingsClick() {
        setIsDropdownOpen(false);
        onButtonClick('settings');
    }

    return (
        <>

            <MenuItem name="Settings" icon={<SettingsIcon />} onClick={handleSettingsClick} />

            <MenuItem name="Logout" icon={<LogoutIcon />} onClick={handleLogoutClick} />

        </>

    )
}

export default ContactPaneMenuItems;