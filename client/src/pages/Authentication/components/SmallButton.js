function SmallButton({text, onButtonClick}){
  
    return (
      <div onClick={onButtonClick} className="px-2 text-white p-1 h-8 text-sm flex w-28 items-center justify-center bg-light-bigButtonNormal dark:bg-dark-bigButtonNormal hover:bg-light-bigButtonHover dark:hover:bg-dark-bigButtonHover cursor-pointer">
            {text}
      </div>
    )
}

export default SmallButton;