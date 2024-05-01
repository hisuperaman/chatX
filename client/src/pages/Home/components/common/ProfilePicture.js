import pfp from '../../../../images/pfp.jpg'

function ProfilePicture({img, isBig}){
    return (
        <img src={img?img:pfp} alt="" className={`max-w-sm ${(isBig)?('w-20'):('w-12')} border border-light-line dark:border-dark-line border-2 rounded-full`} />
    )
}

export default ProfilePicture;