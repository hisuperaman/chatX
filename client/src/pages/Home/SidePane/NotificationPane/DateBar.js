import { getDatetimeWordDateOnly } from "../../../../utils/helpers";

function DateBar({date, isFirstNotification}){

    const dateObj = new Date(date);
    console.log(dateObj)
    const dateString = getDatetimeWordDateOnly(dateObj);

    return (
        (isFirstNotification)?
            (<div className="mt-1 font-bold p-2 border-b-2 border-light-line dark:border-dark-line">
                {dateString}
            </div>)
        :('')
    )
}

export default DateBar;