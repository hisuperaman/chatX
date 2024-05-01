function InputField({name, value, onChange}){
    return (
        <input type={'text'} name={name} value={value} onChange={onChange} className='border-b-2 border-light-inputField dark:border-dark-inputField p-2 bg-transparent text-sm focus:outline-none focus:border-light-inputFieldFocus dark:focus:border-dark-inputFieldFocus transition-colors duration-100 w-4/5' />
    )
}

export default InputField;