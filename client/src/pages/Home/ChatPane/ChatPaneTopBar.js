import ProfilePicture from "../components/common/ProfilePicture";
import DropDownMenu from "../components/common/DropDownMenu";
import SearchButton from "../components/common/SearchButton";
import ContactName from "../components/common/ContactName";
import BackButton from "../components/common/BackButton";
import ChatPaneMenuItems from "./ChatPaneMenuItems";
import { useState } from "react";
import { getDatetimeWord } from "../../../utils/helpers";

function ChatPaneTopBar({ activeContactData, isMobileScreen, onIsChatActive, setActiveContact, setIsUserProfilePaneOpen }) {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    function handleBack() {
        setActiveContact(null);
        onIsChatActive(false);
    }

    function handleProfileClick() {
        setIsUserProfilePaneOpen(true);
    }


    const lastSeen = activeContactData.lastSeen;

    console.log(lastSeen)

    const lastSeenString = `Last seen ${getDatetimeWord(lastSeen)}`;


    return (
        <div className='flex flex-col p-2 pb-0 bg-light-secondary dark:bg-dark-secondary'>

            <div className="flex flex-row items-center">

                <BackButton onBack={handleBack} />

                <div onClick={handleProfileClick} className='flex flex-row cursor-pointer items-center rounded-lg pr-2 hover:bg-light-hover1 dark:hover:bg-dark-hover1'>
                    <ProfilePicture img={activeContactData.pfp} />
                    <div className='ml-3'>
                        <ContactName name={activeContactData.username} isMobileScreen={isMobileScreen} />
                        <div className="text-sm">
                            {activeContactData.isOnline?'Online'
                                :lastSeenString}
                        </div>
                    </div>
                </div>

                <div className="ml-auto flex flex-row">
                    <SearchButton />

                    <DropDownMenu Menu={<ChatPaneMenuItems />} isOpen={isDropdownOpen} setIsOpen={setIsDropdownOpen} />
                </div>

            </div>

            <hr className="h-px mt-2 -mx-2 bg-light-line border-0 dark:bg-dark-line" />

        </div>
    )
}

export default ChatPaneTopBar;