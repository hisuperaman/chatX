function Spinner({isSmall}){
    return (
        <div className={`border-4 border-light-secondary border-t-light-loadingBar dark:border-dark-secondary dark:border-t-dark-loadingBar rounded-full m-auto ${isSmall?('w-6 h-6'):('w-14 h-14')} animate-spin`}>
            
        </div>
    )
}

export default Spinner;