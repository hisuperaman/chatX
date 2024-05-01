import { useState, useEffect } from "react";
import BigButton from "../components/BigButton";
import FormProgressBar from "./components/FormProgressBar";

function MultiStepForm({currentStep, setCurrentStep, isLastStep, setIsLastStep, children}){

    return (
        <div className="">

            <FormProgressBar stepsLength={children.length} currentStep={currentStep} />

            {children[currentStep]}
            
            
        </div>
    )
}

export default MultiStepForm;