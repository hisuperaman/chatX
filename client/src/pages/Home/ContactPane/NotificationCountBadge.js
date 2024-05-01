function NotificationCountBadge({count}){
    return (
        <div className="ml-auto mt-2 w-5 h-5 flex justify-center items-center text-center rounded-full text-white bg-light-button2Normal dark:bg-dark-button2Normal">
            {(count<10)?(count):('9+')}
        </div>
    )
}

export default NotificationCountBadge;