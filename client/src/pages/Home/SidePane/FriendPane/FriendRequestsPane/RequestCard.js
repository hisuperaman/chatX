import { useContext, useEffect, useRef, useState } from "react";
import config from "../../../../../config";
import ContactName from "../../../components/common/ContactName";
import ProfilePicture from "../../../components/common/ProfilePicture";
import Button from "../components/Button";
import { AuthContext } from "../../../../../components/AuthContext";
import { socket } from "../../../../../sio";
import { CSSTransition } from "react-transition-group";
import { getDatetimeWord } from "../../../../../utils/helpers";

function RequestCard({ id, username, name, pfp, onUserCardClick, setFriendRequests, requestCreatedAt }) {
    const { token } = useContext(AuthContext);

    const cardRef = useRef(null);

    const [isButtonClickLoading, setIsButtonClickLoading] = useState(false);
    const [isRejectButtonLoading, setIsRejectButtonLoading] = useState(false);

    useEffect(() => {
        return () => {
            setIsButtonClickLoading(false);
            setIsRejectButtonLoading(false);
        }
    }, [])

    function handleAcceptClick(e) {
        e.stopPropagation();

        try {
            setIsButtonClickLoading(true);

            socket.emit('acceptRequest', { friendId: id });

        }
        catch (e) {

            setIsButtonClickLoading(false);
        }
    }

    function handleRejectClick(e) {
        e.stopPropagation();

        try {
            setIsRejectButtonLoading(true);

            socket.emit('rejectRequest', { friendId: id });

        }
        catch (e) {

            setIsRejectButtonLoading(false);
        }
    }

    return (
        // <CSSTransition
        //     timeout={100}
        //     classNames="contact-card"
        //     nodeRef={cardRef}
        // >

            <div ref={cardRef} onClick={() => onUserCardClick(id)} className={`flex flex-row cursor-pointer border-b-2 border-light-line dark:border-dark-line p-4 hover:bg-light-hover2 dark:hover:bg-dark-hover2 animate-scaleCenter`}>
                <div>
                    <ProfilePicture img={pfp} />
                </div>

                <div className="flex flex-col ml-3 w-2/5">
                    <ContactName name={username} />

                    <div className="flex">
                        {
                            isButtonClickLoading ?
                                <Button isConfirm={true} isLoading={true} /> :
                                <Button text={'Accept'} isConfirm={true} onButtonClick={handleAcceptClick} />
                        }
                        {
                            isRejectButtonLoading ?
                                <Button isConfirm={false} isLoading={true} /> :
                                <Button text={'Reject'} onButtonClick={handleRejectClick} />
                        }
                    </div>
                </div>

                <div className="ml-auto text-xs flex flex-col">
                    <p className="opacity-80">{getDatetimeWord(requestCreatedAt)}</p>
                </div>

            </div>

        // </CSSTransition>

    )
}

export default RequestCard;