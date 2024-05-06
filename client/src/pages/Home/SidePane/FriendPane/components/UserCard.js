import ContactName from "../../../components/common/ContactName";
import ProfilePicture from "../../../components/common/ProfilePicture";

function UserCard({id, username, name, pfp, onUserCardClick}){

    return (

        <div onClick={()=>onUserCardClick(id)} className={`flex flex-row cursor-pointer border-b-2 border-light-line dark:border-dark-line p-4 hover:bg-light-hover2 dark:hover:bg-dark-hover2 animate-scaleCenter`}>
            <div>
                <ProfilePicture img={pfp}/>
            </div>

            <div className="flex flex-col ml-3 w-2/5">
                <ContactName name={username}/>
                <p className="font-thin text-sm opacity-80 w-full truncate whitespace-pre">{name}</p>
            </div>

        </div>

    )
}

export default UserCard;