function FormProgressBarItem({i, currentStep}){

    
    return (
            <div className={`w-1/3 h-1 ${(i<=currentStep)?('bg-light-button2Normal dark:bg-dark-button2Normal'):('bg-light-button2Inactive dark:bg-dark-button2Inactive')} mr-1 last:mr-0 transition-all duration-100`}>

            </div>
    )
}

export default FormProgressBarItem;