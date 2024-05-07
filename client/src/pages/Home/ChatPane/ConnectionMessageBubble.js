import { getDatetimeWordDateOnly } from "../../../utils/helpers";

function ConnectionMessageBubble({message}){
    const messageDate = getDatetimeWordDateOnly(message.sentDatetime);

    const hours = message.sentDatetime.getHours();
    const minutes = message.sentDatetime.getMinutes();

    const hoursString = (hours%12<10 && hours%12!==0)?(`0${hours%12}`):((hours%12===0)?(`12`):(`${hours%12}`));
    const minutesString = (minutes<10)?(`0${minutes}`):(`${minutes}`);
    const messageTime = `${hoursString}:${minutesString} ${(hours<12 || hours===24)?('AM'):('PM')}`;

    return (
        <div className={`text-center text-sm flex flex-col border-b-2 mb-2 ${message.isConnectionMsg?'text-light-bigButtonNormal dark:text-dark-bigButtonNormalLight border-light-bigButtonNormal dark:border-dark-bigButtonNormalLight':(message.message.includes('reconnected')?' border-common-success':' border-common-danger')}`}>
            
            <div className="text-xs">
                {messageDate} {messageTime}
            </div>
            <div>
                {message.message}
            </div>
            
        </div>
    )
}

export default ConnectionMessageBubble;