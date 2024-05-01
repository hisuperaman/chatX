function SearchButton(){
    const SearchIcon = <svg className='bi bi-search' xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                        </svg>;

    return (
        <div className='hover:bg-light-hover1 dark:hover:bg-dark-hover1 cursor-pointer rounded-full w-12 h-12 flex justify-center items-center transition-color duration-200'>
            {SearchIcon}
        </div>
    )
}

export default SearchButton;