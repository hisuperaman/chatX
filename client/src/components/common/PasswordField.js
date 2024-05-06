import { useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import EyeIcon from './EyeIcon';
import EyeSlashIcon from './EyeSlashIcon';

function PasswordField({label, name, value, onChange, alert}){
    const [showPassword, setShowPassword] = useState(false);

    const id = uuidv4();

    function handleShowPasswordClick(){
        setShowPassword(prevShowPassword=>!prevShowPassword);
    }
  
    const input = <input type={`${(showPassword)?('text'):('password')}`} id={id} placeholder={'****'} name={name} value={value} onChange={onChange} className='border-b-2 w-full border-light-inputField dark:border-dark-inputField p-2 bg-transparent text-sm focus:outline-none focus:border-light-inputFieldFocus dark:focus:border-dark-inputFieldFocus transition-colors duration-100' />;
    return (
      <div className='flex flex-col'>
          <label htmlFor={id} className='text-xs mt-4'>
            {label}
          </label>
          <div className='flex'>
            <div className='w-full'>
                {input}
            </div>

            <div onClick={handleShowPasswordClick} className='border dark:border-dark-line border-light-line cursor-pointer flex justify-center items-center rounded-lg hover:bg-light-hover1 dark:hover:bg-dark-hover1 w-1/6 transition-all duration-100'>
                
                {
                    (showPassword)?
                        (<EyeSlashIcon />)
                    :
                        (<EyeIcon />)
                }
                

            </div>
          </div>

          {(alert)?
            (
              <div className='text-xs text-red-600 pt-2 pb-1'>
                {alert}
              </div>
            ):
            ('')
          }
      </div>
    )
}

export default PasswordField;