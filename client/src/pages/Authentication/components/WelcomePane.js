function WelcomePane({isMobileScreen, heading, text, logo}){
    return (
      <div className={`relative h-full bg-light-secondary dark:bg-dark-secondary border border-light-line dark:border-dark-line border-r-2 w-1/2 rounded-l-2xl transition-all duration-100`}>
  
        <div className='absolute top-5 left-8 text-sm md:text-base'>
          ChatX
        </div>
  
        <div className='flex flex-col justify-center items-center h-3/4'>
          <div className="mb-3">
            {logo}
          </div>
          <p className='font-bold text-xl md:text-3xl'>{heading}</p>
          <p className='mt-2 opacity-90 px-8 text-sm md:text-base'>{text}</p>
        </div>
  
        <div className='absolute bottom-8 left-8 text-sm md:text-base'>
          chatx.com
        </div>
        
      </div>
    )
}

export default WelcomePane;