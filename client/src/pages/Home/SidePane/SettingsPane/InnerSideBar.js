import { useEffect, useRef } from "react";
import SidePaneTopBar from "../SidePaneTopBar";
import { CSSTransition } from "react-transition-group";

function InnerSideBar({ onBackClick, isPaneOpen, paneTitle, paneBody }) {

    const paneRef = useRef(null);


    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        }
    }, [isPaneOpen]);

    return (
        <CSSTransition
            in={isPaneOpen}
            unmountOnExit
            timeout={100}
            classNames={`user-profile-pane`}
            nodeRef={paneRef}
        >
            <div ref={paneRef} className={`absolute top-0 overflow-x-hidden flex h-full flex-col w-full left-0`}>
                <SidePaneTopBar paneTitle={paneTitle} onBackClick={onBackClick} />

                <div className='flex flex-col overflow-y-auto bg-light-primary dark:bg-dark-primary h-full'>
                    {paneBody}    
                </div>

            </div>
        </CSSTransition>
    )
}

export default InnerSideBar;