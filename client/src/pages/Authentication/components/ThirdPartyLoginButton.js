function ThirdPartyLoginButton({text, logo}){
  
    return (
      <div className="pl-2 pr-2 mr-2 text-white p-1 h-12 flex w-full ml-auto items-center bg-light-bigButtonNormal dark:bg-dark-bigButtonNormal hover:bg-light-bigButtonHover dark:hover:bg-dark-bigButtonHover cursor-pointer">
          <img className={`w-12 mr-4`} src={logo} alt='' />
          {text}
      </div>
    )
}

export default ThirdPartyLoginButton;