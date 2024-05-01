function BigButton({text, onButtonClick}){
  
    return (
      <div onClick={onButtonClick} className="px-2 mr-2 text-white p-1 h-12 flex w-full ml-auto items-center justify-center bg-light-bigButtonNormal dark:bg-dark-bigButtonNormal hover:bg-light-bigButtonHover dark:hover:bg-dark-bigButtonHover cursor-pointer">
            {text}
      </div>
    )
}

export default BigButton;