import { NothingFoundIcon } from "../../pages/Home/SidePane/NotificationPane/components/NothingFoundIcon"

export function NothingFoundDiv({text, icon}) {
    return (
        <div className="flex flex-col items-center mt-[20%] h-full">
            <div className="flex justify-center">
                {icon ? icon : <NothingFoundIcon />}
            </div>
            <div className="text-xl">
                {text}
            </div>
        </div>
    )
}