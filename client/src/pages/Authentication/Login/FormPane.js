import googleLogo from '../../../images/google_logo.png';
import InputField from '../../../components/common/InputField';
import BigButton from '../components/BigButton';
import ThirdPartyLoginButton from '../components/ThirdPartyLoginButton';

import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DarkModeToggleButton from '../components/DarkModeToggleButton';
import FormPaneContainer from '../components/FormPaneContainer';
import FormHeading from '../components/FormHeading';
import ButtonLabel from '../components/ButtonLabel';
import LinkLabel from '../components/LinkLabel';

import config from '../../../config';
import { AuthContext } from '../../../components/AuthContext';
import Alert from '../../../components/common/Alert';

function Form({isMobileScreen, isDarkMode, setIsDarkMode, setIsLoading}){
    
    const navigate = useNavigate();

    const [isAlert, setIsAlert] = useState({});

    const {setGlobalToken} = useContext(AuthContext);

    const [formData, setFormData] = useState({
      username: '',
      password: ''
    })

    async function handleLoginClick(){

      setIsLoading(true);

      const response = await fetch(config.serverURL+"/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: formData.username, password: formData.password})
      })

      const data = await response.json();

      if(!response.ok){
        setIsLoading(false);

        setIsAlert({isSuccess: false, text: data.message});
        return;
      }

      console.log(response);

      // store token
      const token = data.token;
      setGlobalToken(token);

      navigate('/');
      setIsLoading(false);

    }


    function handleSignupClick(){
        setIsLoading(true);

        navigate('/signup');

        setIsLoading(false);
    

    }


    function handleInputChange(key, value){
      setFormData((prevFormData)=>{
        return {
          ...prevFormData,
          [key]: value
        }
      })
      // console.log(formData)
    }

    function handleKeyDown(e){
      const key = e.key;
      if(key==='Enter'){
        handleLoginClick();
      }
    }

    return (
      <FormPaneContainer isMobileScreen={isMobileScreen} >
         
        <div className='flex mb-3'>
          <FormHeading heading={"Login"} />

          <DarkModeToggleButton isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        </div>
  
        <div className='flex flex-col'>
          <InputField label="Username" type="text" placeholder={"john"} name={'username'} value={formData.username} onChange={(e)=>handleInputChange(e.target.name, e.target.value)} onKeyDown={handleKeyDown} />
          <InputField label="Password" type="password" placeholder={"****"} name={'password'} value={formData.password} onChange={(e)=>handleInputChange(e.target.name, e.target.value)} onKeyDown={handleKeyDown} />
        </div>

        <div className='mt-2'>
          <BigButton text={"Continue"} onButtonClick={handleLoginClick} />
        </div>
  
  
        <div className='mt-2 text-center'>
            <ButtonLabel text={"or create a new account"} />
            <LinkLabel text={"Sign up"} onLinkClick={handleSignupClick} />
        </div>

        {
          isAlert.text && <div className='fixed top-2 right-2'>
            <Alert text={isAlert.text} isSuccess={isAlert.isSuccess} setIsAlert={setIsAlert} />
          </div>
        }


      </FormPaneContainer>
    )
}

export default Form;