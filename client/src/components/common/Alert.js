import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import SuccessIcon from "./SuccessIcon";
import ErrorIcon from "./DangerIcon";

function LoadingBar({ isSuccess }) {
    return (
        <div className={`${isSuccess ? ('bg-common-success') : ('bg-common-danger')} h-[2px] animate-loading`}></div>
    )
}

function Alert({text, isSuccess, setIsAlert}) {

    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timeout = 4000;
        const timer = setTimeout(() => {
            setIsAlert({});
            setIsVisible(false);
        }, timeout);

        return () => clearTimeout(timer);
    }, []);


    return (
        <div>
            {isVisible && (
                <div className={`relative flex flex-col p-2 shadow-lg bg-light-secondary dark:bg-dark-secondary border-l-4 rounded border border-dark-line h-full w-48 text-sm ${isSuccess ? ('border-l-common-success') : ('border-l-common-danger')}`}>
                    <div className="flex">
                        <div className="mb-2">
                            {
                                isSuccess ? <SuccessIcon /> : <ErrorIcon />
                            }
                        </div>
                        <div className="ml-2 break-words">
                            {text}
                        </div>
                    </div>
                    <div className="absolute w-full bottom-0 left-0">
                        <LoadingBar isSuccess={isSuccess} />
                    </div>
                </div>
            )

            }

        </div>
    )
}

export default Alert;