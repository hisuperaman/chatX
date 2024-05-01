import { useEffect, useState } from "react";
import InputField from "../../../../components/common/InputField";
import BigButton from "../../components/BigButton";

function FormStepTwo({formData, onInputChange, onContinueClick, setIsLoading, onAlert}){

    const [isNameValid, setIsNameValid] = useState(false);


    function checkName(){
        if(formData.name==''){
            return {
                ok: false,
                message: 'Name cannot be empty'
            }
        }

        return {
            ok: true,
            message: null
        }
    }

    useEffect(()=>{
        const nameValidInfo = checkName();
        if(!nameValidInfo.ok){
            onAlert('name', nameValidInfo.message)
            setIsNameValid(false);
        }
        else{
            onAlert('name', null);
            setIsNameValid(true);
        }
    }, [formData.name])

    function handleContinueClick(){
        setIsLoading(true);

        if(isNameValid){
            onContinueClick();
        }
        else{
            
        }

        setIsLoading(false);
    }

    return (
        <div className='flex flex-col'>
          <InputField label="Name" type="text" placeholder={"John Doe"}  name={"name"} value={formData.name} onChange={(e)=>onInputChange(e.target.name, e.target.value)} alert={formData.alert.name} />
        
          <div className="mt-8">
              <BigButton text={"Continue"} onButtonClick={handleContinueClick} />
          </div>
        </div>
    )
}

export default FormStepTwo;