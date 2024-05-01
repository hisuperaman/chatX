import { useState, useRef, useEffect } from "react";
import pfp from '../../images/pfp.jpg';

function OpenablePfp({ img }) {
    const pfpRef = useRef(null);

    const [isPfpClicked, setIsPfpClicked] = useState(false);

    function handlePfpClick() {
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
            <div className={`w-28 h-28`} onClick={handlePfpClick}>
                <img ref={pfpRef} src={img ? img : pfp} alt="" className={`max-w-sm w-28 border border-light-line dark:border-dark-line border-2 hover:border-light-focus dark:hover:border-dark-focus cursor-pointer transition-[top] duration-200 ${(isPfpClicked) ? ('w-64 absolute top-20 -left-20 ml-3 rounded-sm z-50') : ('w-28 ml-0 left-0 top-0 absolute rounded-full')}`} />
            </div>
    )
}

export default OpenablePfp;