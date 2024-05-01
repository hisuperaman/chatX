function ConnectionMessageBubble({message}){
    const messageDate = `${message.sentDatetime.getFullYear()}/${message.sentDatetime.getMonth()+1}/${message.sentDatetime.getDate()}`;

    const hours = message.sentDatetime.getHours();
    const minutes = message.sentDatetime.getMinutes();

    const hoursString = (hours%12<10 && hours%12!==0)?(`0${hours%12}`):((hours%12===0)?(`12`):(`${hours%12}`));
    const minutesString = (minutes<10)?(`0${minutes}`):(`${minutes}`);
    const messageTime = `${hoursString}:${minutesString} ${(hours<12 || hours===24)?('AM'):('PM')}`;

    return (
        <div className="text-center text-sm flex flex-col border-b-2 border-light-line dark:border-dark-line mb-2">
            
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