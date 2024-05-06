import CloseIcon from "./components/CloseIcon"
import UploadIcon from "./components/UploadIcon"
import RemoveIcon from "./components/RemoveIcon"
import { useRef } from "react"
import { CSSTransition } from "react-transition-group";


function CloseButton({ onCloseClick }) {
    return (
        <div onClick={onCloseClick} className="ml-auto cursor-pointer">
            <CloseIcon />
        </div>
    )
}

function ActionButton({ text, icon, onButtonClick, isUploadBtn }) {
    return (
        <div onClick={onButtonClick} className={`w-2/5 border-2 light:border-light-line dark:border-dark-line flex justify-center h-12 items-center light:bg-light-secondary dark:bg-dark-secondary cursor-pointer ${isUploadBtn ? 'hover:bg-common-success' : 'hover:bg-common-danger'} transition duration-50`}>
            {icon}
        </div>
    )
}

export default function ChangePfpModal({ showChangePfpModal, onModalCloseClick, onUploadClick, onRemoveClick }) {
    const ref = useRef(null);

    return (
        <CSSTransition
            in={showChangePfpModal}
            unmountOnExit
            timeout={50}
            classNames="change-pfp-modal"
            nodeRef={ref}
        >
            <div ref={ref} className="flex justify-center w-full text-sm mb-2">
                <div className="border-2 light:border-light-line dark:border-dark-line w-2/3 flex flex-col p-1 pb-4 dark:bg-dark-primary light:bg-light-primary">

                    <CloseButton onCloseClick={onModalCloseClick} />

                    <div className="flex justify-between px-6 mt-2">
                        <ActionButton onButtonClick={onUploadClick} text={'Upload'} icon={<UploadIcon />} isUploadBtn={true} />
                        <ActionButton onButtonClick={onRemoveClick} text={'Remove'} icon={<RemoveIcon />} />
                    </div>
                </div>
            </div>

        </CSSTransition>
    )
}