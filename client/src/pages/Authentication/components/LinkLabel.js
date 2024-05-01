function LinkLabel({text, onLinkClick}){
    return (
        <span onClick={onLinkClick} className='ml-1 cursor-pointer text-sm text-light-bigButtonNormal dark:text-dark-bigButtonNormal hover:text-light-bigButtonHover hover:dark:text-dark-bigButtonHover'>
            {text}
        </span>
    )
}

export default LinkLabel;