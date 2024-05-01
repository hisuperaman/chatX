import { useState } from 'react';

function SearchBar({placeholder, searchQuery, onSearchQueryChange}){
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const SearchIcon = <svg className='bi bi-search' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                        </svg>;
    const BackIcon = <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
                    </svg>;


    function handleInputFocus(){
        setIsSearchFocused(true);
    }

    function handleInputBlur(){
        setIsSearchFocused(false);
    }

    function getIcon(){
        return isSearchFocused?BackIcon:SearchIcon;
    }

    function getIconTransform(){
        return isSearchFocused?"scale(1.2)":"scale(1)";
    }

    return (
        <div className='flex-1 flex items-center border-2 rounded-lg border-light-line dark:border-dark-line focus-within:border-light-focus dark:focus-within:border-dark-focus transition-all duration-200 bg-light-primary dark:bg-dark-primary'>
            <div className='w-6 h-10 flex items-center justify-center ml-2 transition-transform duration-200' style={{transform: getIconTransform(), transition: "all 200ms"}}>
                {getIcon()}
            </div>
            <input type='text' value={searchQuery} onChange={(e)=>onSearchQueryChange(e.target.value)} placeholder={placeholder} onFocus={handleInputFocus} onBlur={handleInputBlur} className='w-full p-2 bg-transparent text-sm focus:outline-none'/>
        </div>
    )
}

export default SearchBar;