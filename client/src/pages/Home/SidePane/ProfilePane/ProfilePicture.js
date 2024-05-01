import { useState, useRef, useEffect } from "react";
import pfp from '../../../../images/pfp.jpg'

export default function ProfilePicture({img, onChangePfpClick}){
    const pfpRef = useRef(null);

    const [isPfpClicked, setIsPfpClicked] = useState(false);

    function handlePfpClick(){
        setIsPfpClicked(!isPfpClicked);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            // checks if clicked outside the menu
            if (pfpRef.current && !pfpRef.current.contains(event.target)) {
                setIsPfpClicked(false);
            }
        };
    
        document.addEventListener('click', handleClickOutside);
    
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, []);

    return (
        <div ref={pfpRef} className="flex justify-center p-4">
            <span className="relative">
                <div className="w-28 h-28" onClick={handlePfpClick}>
                    <img src={img?img:pfp} alt="" className={`max-w-sm w-28 border border-light-line dark:border-dark-line border-2 hover:border-light-focus dark:hover:border-dark-focus cursor-pointer transition-[top] duration-200 ${(isPfpClicked)?('w-64 absolute top-20 -left-20 ml-3 rounded-sm z-50'):('w-28 ml-0 left-0 top-0 absolute rounded-full')}`} />
                </div>
                
                <div onClick={onChangePfpClick} className={`absolute bottom-0 right-0 border-2 border-light-line dark:border-dark-line rounded-full w-10 h-10 flex items-center justify-center dark:bg-dark-button1Normal bg-light-button1Normal hover:bg-light-button1Hover dark:hover:bg-dark-button1Hover cursor-pointer transition-all duration-100 ${(isPfpClicked)?('scale-0'):('scale-100')}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-camera" viewBox="0 0 16 16">
                        <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z"/>
                        <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
                    </svg>
                </div>
            </span>
        </div>
    )
}