import ChatIcon from '../../../../../components/common/ChatIcon';
import SettingsCard from '../components/SettingsCard';
import ContactUsIcon from './components/ContactUsIcon';
import ContactUsPaneBody from './ContactUsPane/ContactUsPaneBody';

import InnerSideBar from '../InnerSideBar';
import { useState } from 'react';

export default function HelpPaneBody() {

    const [openedPane, setOpenedPane] = useState(false);

    function handleCardClick(paneName) {
        setOpenedPane(paneName);
    }

    function handleBackClick() {
        setOpenedPane('');
    }

    return (
        <>
            <div className="relative h-full">
                <div className="flex flex-col items-center mb-4">
                    <div className="my-4">
                        <ChatIcon isBig={true} />
                    </div>
                    <p className="text-sm opacity-80">ChatX - Version 1.0</p>
                </div>
                <div>
                    <SettingsCard text={"Contact us"} icon={<ContactUsIcon />} onCardClick={handleCardClick} />
                </div>
                <div className="absolute bottom-0 text-center w-full">
                    Developed with <span className="text-red-600">❤</span> by <a href="https://github.com/hisuperaman" target="_blank" rel='noreferrer' className="text-light-bigButtonNormal dark:text-dark-bigButtonNormal">hisuperaman</a>
                </div>



            </div>
            <InnerSideBar onBackClick={handleBackClick} isPaneOpen={openedPane === 'contact us'} paneTitle={'Contact Us'} paneBody={<ContactUsPaneBody />} />
        </>
    )
}