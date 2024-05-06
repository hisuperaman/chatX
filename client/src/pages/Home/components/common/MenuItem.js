function MenuItem({ name, icon, onClick }) {
    return (
        <div onClick={onClick} className="flex cursor-pointer p-2 hover:bg-light-hover2 dark:hover:bg-dark-hover2 dark:hover:rounded hover:rounded border-t-2 border-light-line dark:border-dark-line first:border-t-0 last:mt-4 last:text-common-danger">
            <div className="px-2 w-10">
                {icon}
            </div>
            <div className="">
                {name}
            </div>
        </div>
    )
}

export default MenuItem;