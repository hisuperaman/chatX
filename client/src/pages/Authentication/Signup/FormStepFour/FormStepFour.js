import { useState, useEffect } from "react";
import BigButton from "../../components/BigButton";
import PasswordField from "../../../../components/common/PasswordField";
import PasswordValidBox from "./PasswordValidBox";
import Alert from "../../../../components/common/Alert";

function FormStepFour({formData, onInputChange, onContinueClick, setIsLoading, onAlert, onSignUpClick}){

    const [isPasswordValid, setIsPasswordValid] = useState(false);

    const [isAlert, setIsAlert] = useState({});

    const [passwordValidStates, setPasswordValidStates] = useState({
      'number': false,
      'symbol': false,
      'lowercase': false,
      'uppercase': false,
      'characters': false
    });

    function checkPassword(){
      // initialize states
      setPasswordValidStates((prevPasswordValidStates)=>{
        return {
          ...prevPasswordValidStates,
          'number': true,
          'symbol': true,
          'lowercase': true,
          'uppercase': true,
          'characters': true
        }
      })

      let isInvalid = false;
      let newPasswordValidStates = {};

      // check for password valid states
      if(!/\d/.test(formData.password)){
        newPasswordValidStates.number = false;

        isInvalid = true;
      }
      if(!/[^\w\s]/.test(formData.password)){
        newPasswordValidStates.symbol = false;

        isInvalid = true;
      }

      if(!/[a-z]/.test(formData.password)){
        newPasswordValidStates.lowercase = false;

        isInvalid = true;
      }
      if(!/[A-Z]/.test(formData.password)){
        newPasswordValidStates.uppercase = false;

        isInvalid = true;
      }
      if(formData.password.length<8 || formData.password.length>50){
        newPasswordValidStates.characters = false;

        isInvalid = true;
      }


      // set states and return if any check is invalid
      if(isInvalid){
        setPasswordValidStates((prevPasswordValidStates)=>{
          return {
            ...prevPasswordValidStates,
            ...newPasswordValidStates
          }
        })
        return {
          ok: false,
          message: null
        }
      }

      return {
        ok: true,
        message: null
      }
    }

    useEffect(()=>{
      const passwordValidInfo = checkPassword();
      if(!passwordValidInfo.ok){
          setIsPasswordValid(false);
      }
      else{
          setIsPasswordValid(true);
      }
  }, [formData.password])

    function handleSignUpClick(){
      if(isPasswordValid){
        onSignUpClick();
      }
      else{
        setIsAlert({
          isSuccess: false,
          text: "Enter a valid password"
        })
      }
    }

    return (
        <div className='flex flex-col'>
          <PasswordField label="Password" name={"password"} value={formData.password} onChange={(e)=>onInputChange(e.target.name, e.target.value)} alert={formData.alert.password} />

          <div className="grid grid-cols-2 mt-4">
            <PasswordValidBox text={'One number'} isValid={passwordValidStates.number} />
            <PasswordValidBox text={'One symbol'} isValid={passwordValidStates.symbol} />
            <PasswordValidBox text={'One lowercase letter'} isValid={passwordValidStates.lowercase} />
            <PasswordValidBox text={'One uppercase letter'} isValid={passwordValidStates.uppercase} />
            <PasswordValidBox text={'Use 8-50 characters'} isValid={passwordValidStates.characters} />
          </div>

          <div className="mt-8">
              <BigButton text={"Sign Up"} onButtonClick={handleSignUpClick} />
          </div>

          {
            isAlert.text && <div className='fixed top-2 right-2'>
              <Alert text={isAlert.text} isSuccess={isAlert.isSuccess} setIsAlert={setIsAlert} />
            </div>
          }


        </div>
    )
}

export default FormStepFour;