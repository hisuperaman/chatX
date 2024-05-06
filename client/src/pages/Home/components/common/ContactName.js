function ContactName({name, isMobileScreen}){
    return (
        <p className={`flex text-center ${isMobileScreen?('text-md'):('text-lg')}`}>{name}</p>
    )
}

export default ContactName;