import InputField from "../../../../components/common/InputField";
import BigButton from "../../components/BigButton";
import Alert from "../../../../components/common/Alert";

import config from "../../../../config";
import { useState, useEffect } from "react";

function FormStepThree({formData, onInputChange, onContinueClick, setIsLoading, onAlert}){

    const [isUsernameValid, setIsUsernameValid] = useState(false);

    const [isAlert, setIsAlert] = useState({});

    function checkUsername(){
      if(formData.username==''){
        return {
          ok: false,
          message: 'Username cannot be empty'
        }
      }
      
      return {
        ok: true,
        message: null
      }
    }

    useEffect(()=>{
      const usernameValidInfo = checkUsername();
      if(!usernameValidInfo.ok){
          onAlert('username', usernameValidInfo.message)
          setIsUsernameValid(false);
      }
      else{
          onAlert('username', null);
          setIsUsernameValid(true);
      }
  }, [formData.username])

    async function handleContinueClick(){
        setIsLoading(true);
  
        if(isUsernameValid){

        
          const response = await fetch(config.serverURL+"/auth/checkusername", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: formData.username})
          })

          const data = await response.json();
    
          if(!response.ok){
            setIsAlert({
              isSuccess: false,
              text: data.message
            });

            setIsLoading(false);
            return;
          }
    
          onContinueClick();

        }
        else{
          
        }
        
        setIsLoading(false);
  
    }

    return (
        <div className='flex flex-col'>
          <InputField label="Username" type="text" placeholder={"john"}  name={"username"} value={formData.username} onChange={(e)=>onInputChange(e.target.name, e.target.value)} alert={formData.alert.username} />
        
          <div className="mt-8">
              <BigButton text={"Continue"} onButtonClick={handleContinueClick} />
          </div>


          {
            isAlert.text && <div className='fixed top-2 right-2'>
              <Alert text={isAlert.text} isSuccess={isAlert.isSuccess} setIsAlert={setIsAlert} />
            </div>
          }

        </div>
    )
}

export default FormStepThree;