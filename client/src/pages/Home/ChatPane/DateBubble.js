import { getDatetimeWordDateOnly } from "../../../utils/helpers";

function DateBubble({date, isFirstMsg}){

    const dateObj = new Date(date);
    const dateString = getDatetimeWordDateOnly(dateObj);

    return (

        (isFirstMsg)?
            (<div className="text-center text-sm flex flex-col border-b-2 border-light-line dark:border-dark-line mb-2">
                
                <div className="text-xs">
                    {dateString}
                </div>
                
            </div>)
            :
            ('')
        
    )
}

export default DateBubble;