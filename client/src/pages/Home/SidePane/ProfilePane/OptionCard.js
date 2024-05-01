import { useState } from 'react';
import InputField from './InputField';
import EditIcon from './EditIcon';
import ConfirmIcon from './ConfirmIcon';

function OptionCard({name, value, icon, isEditable, onConfirmClick, onOptionChange}){
    const [isEditClicked, setIsEditClicked] = useState(false);

    function handleEditClick(){
        setIsEditClicked(true);
    }

    function handleConfirmClick(){
        setIsEditClicked(false);

        // handle confirm click
        onConfirmClick(name.toLowerCase(), value);
    }

    function handleInputChange(name, value){
        onOptionChange(name, value);
    }

    return (
        <div className="flex flex-col">
            <div className={`flex flex-row px-4 py-2`}>
                
                <div className="opacity-80 flex mt-2">
                    {icon}
                </div>

                <div className="flex flex-col ml-4 w-4/5">

                    <div className="opacity-80 text-sm">{name}</div>
                    {
                        (isEditClicked)?
                            (<InputField name={name.toLowerCase()} value={value} onChange={(e)=>handleInputChange(e.target.name, e.target.value)} />)
                        :
                            (<div>{value}</div>)
                    }
                    

                </div>

                <div className='ml-auto'>
                {
                    (isEditable)?
                        (isEditClicked)?
                            (<div onClick={handleConfirmClick} className="ml-auto flex items-center border-2 border-light-line dark:border-dark-line rounded-full w-11 h-11 justify-center hover:bg-light-button1Hover dark:hover:bg-dark-button1Hover dark:bg-dark-button1Normal bg-light-button1Normal cursor-pointer">
                                <ConfirmIcon />
                            </div>):
                            (<div onClick={handleEditClick} className="ml-auto flex items-center border-2 border-light-line dark:border-dark-line rounded-full w-11 h-11 justify-center hover:bg-light-button1Hover dark:hover:bg-dark-button1Hover dark:bg-dark-button1Normal bg-light-button1Normal cursor-pointer">
                                <EditIcon />
                            </div>)
                    :('')
                }
                </div>

            </div>

            <div className={`border-b-2 mx-4 dark:border-dark-line border-light-line`}></div>

        </div>
    )
}

export default OptionCard;