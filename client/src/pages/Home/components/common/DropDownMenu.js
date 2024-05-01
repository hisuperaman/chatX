import { useRef, useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";


function DropDownMenu({Menu, isOpen, setIsOpen}){

    const menuContainerRef = useRef(null);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            // checks if clicked outside the menu
            if (menuContainerRef.current && !menuContainerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
    
        document.addEventListener('click', handleClickOutside);
    
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, []);

    function handleClick(){
        setIsOpen(!isOpen);
    }

    return (
        <div className="relative" ref={menuContainerRef}>
            <div onClick={handleClick} className={`hover:bg-light-hover1 dark:hover:bg-dark-hover1 ${(isOpen)?('bg-light-hover1 dark:bg-dark-hover1'):('')} cursor-pointer rounded-full w-12 h-12 flex justify-center items-center transition-color duration-200`}>
                <svg className='text-black dark:text-white' xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16"> <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" fill="currentColor"></path> </svg>
            </div>

            <CSSTransition
              in={isOpen}
              unmountOnExit
              timeout={100}
              classNames="dropdown-menu"
              nodeRef={menuRef}
            >
                
                <div ref={menuRef} className="z-10 absolute right-0 dark:bg-dark-primary bg-light-primary border rounded w-40 text-left">
                    
                    {Menu}
                    
                </div>
                
            </CSSTransition>


        </div>
    )
}

export default DropDownMenu;