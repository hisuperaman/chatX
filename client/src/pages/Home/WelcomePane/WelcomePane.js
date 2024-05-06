import ChatIcon from "../../../components/common/ChatIcon";

function WelcomePane({isChatActive}){
    return (
        <div className={`flex w-3/5 flex-col bg-light-primary dark:bg-dark-primary border-l-2 border-light-line dark:border-dark-line hidden ${(isChatActive)?('sm:hidden'):('sm:flex')}`}>
            
            <div className="cursor-default text-center p-4 flex flex-col space-y-1 h-4/5 items-center justify-center">
                <div className="flex justify-center mb-2">
                    <ChatIcon />
                </div>
                <div className="text-3xl font-bold">
                    ChatX
                </div>
                <div className="text-sm opacity-80">
                    Thank you for using ChatX
                </div>
            </div>

        </div>
    )
}

export default WelcomePane;