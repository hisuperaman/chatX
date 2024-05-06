import ContactName from "../components/common/ContactName";
import BackButton from "../components/common/BackButton";

function SidePaneTopBar({paneTitle, onBackClick}){

    function handleBack(){
        onBackClick(null);
    }

    return (
        <div className='flex flex-col p-2 pb-0 bg-light-secondary dark:bg-dark-secondary'>

            <div className="flex flex-row items-center h-16">

                <BackButton onBack={handleBack} />

                <div className='flex flex-row items-center'>
                    <div className='ml-3'>
                        <ContactName name={paneTitle}/>
                    </div>
                </div>

                <div className="ml-auto flex flex-row">
                    
                </div>

            </div>

            <hr className="h-px mt-2 -mx-2 bg-light-line border-0 dark:bg-dark-line" />

        </div>
    )
}

export default SidePaneTopBar;