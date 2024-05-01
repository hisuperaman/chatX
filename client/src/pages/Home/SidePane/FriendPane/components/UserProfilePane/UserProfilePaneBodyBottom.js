import Spinner from "../../../../../../components/common/Spinner";

function UserSocialInfoItem({name, value}){
    return (
        <div className="flex flex-col text-center">
            <div className="font-bold">{value}</div>
            <div>{name}</div>
        </div>
    )
}

function UserSocialInfo({friendCount, sinceDate}){
    return (
        <div className="flex text-xs justify-between last:mx-4">
            <UserSocialInfoItem name={'Friends'} value={friendCount} />
            <UserSocialInfoItem name={'Joined'} value={sinceDate} />
        </div>
    )
}

function UserProfilePaneBodyBottom({userMetaData, isLoading}){
    const createdAtDate = new Date(userMetaData.createdAt);
    const createdAtDateStr = `${createdAtDate.getDate()}/${createdAtDate.getMonth()+1}/${createdAtDate.getFullYear()}`;

    return (
        <div className="w-full">
            {
                (!isLoading)?
                    <UserSocialInfo friendCount={userMetaData.friendCount} sinceDate={createdAtDateStr} />
                :
                    <div className="">
                        <Spinner isSmall={true} /> 
                    </div>
            }
        </div>
    )
}

export default UserProfilePaneBodyBottom;