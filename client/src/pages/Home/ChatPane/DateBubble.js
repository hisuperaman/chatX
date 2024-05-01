function DateBubble({date, isFirstMsg}){

    return (

        (isFirstMsg)?
            (<div className="text-center text-sm flex flex-col border-b-2 border-light-line dark:border-dark-line mb-2">
                
                <div className="text-xs">
                    {date}
                </div>
                
            </div>)
            :
            ('')
        
    )
}

export default DateBubble;