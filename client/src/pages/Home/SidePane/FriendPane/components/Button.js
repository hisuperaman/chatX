import Spinner from "../../../../../components/common/Spinner";

function Button({text, isConfirm, onButtonClick, isLoading}){
    return (
        <div onClick={onButtonClick} className={`border-2 pl-2 pr-2 mr-2 text-sm rounded p-1 flex w-20 justify-center ${(isConfirm)?('bg-light-bigButtonNormal text-white dark:bg-dark-bigButtonNormal hover:bg-light-bigButtonHover dark:hover:bg-dark-bigButtonHover'):('bg-light-button1Normal dark:bg-dark-button1Normal hover:bg-light-button1Hover dark:hover:bg-dark-button1Hover')} border-light-line dark:border-dark-line cursor-pointer`}>
            {isLoading?<Spinner isSmall={true} />:text}
        </div>
    )
}

export default Button;