function FormPaneContainer({isMobileScreen, children}){
    return (
        <div className={`relative h-full bg-light-secondary dark:bg-dark-secondary border border-light-line dark:border-dark-line border-l-0 flex-1 p-10 flex flex-col ${(isMobileScreen)?('rounded-2xl m-auto'):('w-1/2 rounded-r-2xl rounded-l-none m-0')} transition-all duration-100`}>
            {children}
        </div>
    )
}

export default FormPaneContainer;