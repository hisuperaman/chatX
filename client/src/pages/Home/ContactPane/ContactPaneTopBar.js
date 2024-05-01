import ProfilePicture from '../components/common/ProfilePicture';
import DropDownMenu from '../components/common/DropDownMenu';
import ContactName from '../components/common/ContactName';
import ContactPaneMenuItems from './ContactPaneMenuItems';

import SearchBar from '../components/common/SearchBar';
import NotificationCountBadge from './NotificationCountBadge';
import { useEffect, useState } from 'react';



function AddButton({onButtonClick}){
    function handleAddButtonClick(){
        onButtonClick('add')
    }

    return (
        <div onClick={handleAddButtonClick} className='rounded-lg cursor-pointer hover:bg-light-hover1 dark:hover:bg-dark-hover1 w-12 h-12 flex justify-center items-center transition-colors duration-200'>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person-add" viewBox="0 0 16 16">
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
                <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1z"/>
            </svg>
        </div>
    )
}

function NotificationButton({onButtonClick, notificationCount}){

    function handleNotificationButtonClick(){
        onButtonClick('notification');
    }

    return (
        <div onClick={handleNotificationButtonClick} className='rounded-lg cursor-pointer hover:bg-light-hover1 dark:hover:bg-dark-hover1 w-12 h-12 flex justify-center items-center transition-colors duration-200 bi bi-bell'>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6"/>
            </svg>

            {
                (notificationCount>0)?
                    <div>
                        <NotificationCountBadge count={notificationCount} />
                    </div>
                :
                    ('')
            }
            

        </div>
    )
}

function UserProfile({name, pfp, onButtonClick}){
    function handleProfileClick(){
        onButtonClick('myprofile');
    }

    return (
        <div onClick={handleProfileClick} className='flex flex-row cursor-pointer items-center rounded-lg pr-2 hover:bg-light-hover1 dark:hover:bg-dark-hover1'>
            <ProfilePicture img={pfp} />
            <div className='ml-3'>
                <ContactName name={name}/>
            </div>
        </div>
    )
}

function ContactPaneTopBar({onButtonClick, notificationCount, isDarkMode, setIsDarkMode, setIsLoading, userData}){
    
    const [searchQuery, setSearchQuery] = useState('');

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    function handleSearchQueryChange(value){
        setSearchQuery(value);
    }

    useEffect(()=>{
        
    }, [searchQuery]);
    
    return (
        <div className='flex flex-col p-2 bg-light-secondary dark:bg-dark-secondary border-b border-light-line dark:border-dark-line'>
            
            <div className="flex flex-row items-center">

                <UserProfile name={userData.username} pfp={userData.pfp} onButtonClick={onButtonClick} />

                <div className='ml-auto'>
                    
                    <DropDownMenu Menu={<ContactPaneMenuItems setIsLoading={setIsLoading} onButtonClick={onButtonClick} setIsDropdownOpen={setIsDropdownOpen} />} isOpen={isDropdownOpen} setIsOpen={setIsDropdownOpen} />

                </div>

            </div>

            <hr className="h-px my-2 -mx-2 bg-light-line border-0 dark:bg-dark-line" />

            <div className='flex w-full items-center'>
                <SearchBar placeholder={'Search friends'} searchQuery={searchQuery} onSearchQueryChange={handleSearchQueryChange} />
                
                <div className="h-8 w-px border-l-2 border-light-line mx-3 dark:border-dark-line"></div>
                
                <NotificationButton onButtonClick={onButtonClick} notificationCount={notificationCount} />

                <AddButton onButtonClick={onButtonClick} />
            </div>

        </div>
    )
}

export default ContactPaneTopBar;