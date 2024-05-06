import FormProgressBarItem from "./FormProgressBarItem";

function FormProgressBar({currentStep, stepsLength}){

    const progressBarItems = [];

    for (let i = 0; i < stepsLength; i++) {
        progressBarItems.push(
            <FormProgressBarItem key={i} i={i} currentStep={currentStep} />
        );
    }

    return (
        <div className="w-full bg-light-line dark:bg-dark-line flex">
            {progressBarItems}
        </div>
    )
}

export default FormProgressBar;