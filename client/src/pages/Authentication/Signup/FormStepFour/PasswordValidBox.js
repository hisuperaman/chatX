import CheckIcon from "./CheckIcon";

function PasswordValidBox({text, isValid}){
    return (
        <div className="text-xs flex">
            <div className={`${(isValid)?('text-light-valid dark:text-dark-valid'):('text-light-invalid dark:text-dark-invalid')}`}>
                <CheckIcon />
            </div>
            <div className="flex justify-center items-center">
                {text}
            </div>
        </div>
    )
}

export default PasswordValidBox;