import { useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

function LoadingBar({isLoading}){

    const [isVisible, setIsVisible] = useState(false);
    
    const loadingBarRef = useRef(null);

    return (
        <CSSTransition
            in={isLoading}
            timeout={100}
            classNames={'loading-bar'}
            nodeRef={loadingBarRef}
            onEnter={()=>setIsVisible(true)}
            onExit={()=>setIsVisible(false)}
        >
            <div ref={loadingBarRef} className={`absolute bg-light-loadingBar dark:bg-dark-loadingBar h-1 ${(isVisible)?('w-2/5'):('')}`}></div>
        </CSSTransition>
    )
}

export default LoadingBar;