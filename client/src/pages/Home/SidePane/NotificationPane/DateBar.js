function DateBar({date, isFirstNotification}){

    return (
        (isFirstNotification)?
            (<div className="mt-1 font-bold p-2 border-b-2 border-light-line dark:border-dark-line">
                {date}
            </div>)
        :('')
    )
}

export default DateBar;