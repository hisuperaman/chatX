import {v4 as uuidv4} from 'uuid';

function InputField({label, type, name, value, placeholder, onChange, onKeyDown, alert}){
    const id = uuidv4();
  
    const input = <input type={type} id={id} placeholder={placeholder} name={name} value={value} onChange={onChange} onKeyDown={onKeyDown} className='border-b-2 border-light-inputField dark:border-dark-inputField p-2 bg-transparent text-sm focus:outline-none focus:border-light-inputFieldFocus dark:focus:border-dark-inputFieldFocus transition-colors duration-100' />;
    return (
      <div className='flex flex-col'>
          <label htmlFor={id} className='text-xs mt-4'>
            {label}
          </label>
          {input}

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

export default InputField;