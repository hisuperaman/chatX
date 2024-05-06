import LightModeIcon from "../../../components/common/LightModeIcon";
import DarkModeIcon from "../../../components/common/DarkModeIcon";

function DarkModeToggleButton({isDarkMode, setIsDarkMode}){
    return (
        <div onClick={()=>setIsDarkMode((prevIsDarkMode)=>!prevIsDarkMode)} className='ml-auto border dark:border-dark-line border-light-line cursor-pointer flex justify-center items-center p-1 rounded-lg hover:bg-light-hover1 dark:hover:bg-dark-hover1 w-12 h-12'>
          {
            (isDarkMode)?
              <LightModeIcon />
            :
              <DarkModeIcon />
          }
        </div>
    )
}

export default DarkModeToggleButton;