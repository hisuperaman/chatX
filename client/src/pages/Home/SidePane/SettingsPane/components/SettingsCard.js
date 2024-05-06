export default function SettingsCard({ text, icon, onCardClick, isDanger }) {

    function handleCardClick() {
        onCardClick(text.toLowerCase());
    }

    return (
        <div onClick={handleCardClick} className={`flex flex-row items-center cursor-pointer border-b-2 border-light-line dark:border-dark-line p-5 hover:bg-light-hover2 dark:hover:bg-dark-hover2 ${isDanger ? 'text-common-danger' : ''}`}>
            <div>
                {icon}
            </div>
            <div className="ml-4">
                {text}
            </div>
        </div>
    )
}