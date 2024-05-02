import SearchBar from "../../../components/common/SearchBar";
import UserCard from "../components/UserCard";
import pfp from "../../../../../images/pfp.jpg";
import { useContext, useEffect, useState } from "react";
import UserProfilePane from "../components/UserProfilePane/UserProfilePane";
import config from "../../../../../config";
import { AuthContext } from "../../../../../components/AuthContext";
import Spinner from "../../../../../components/common/Spinner";
import { socket } from '../../../../../sio.js';

function AddFriendPaneBody({ searchedUsers, setSearchedUsers, isUserProfilePaneOpen, setIsUserProfilePaneOpen, setClickedUserID, clickedUserID, showSpinner, setShowSpinner, setClickedUser }) {

    const { token } = useContext(AuthContext);

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        async function fetchUsers(t) {
            setShowSpinner(true);

            try {
                const response = await fetch(config.serverURL + `/api/searchusers?q=${searchQuery}`, {
                    method: 'get',
                    headers: {
                        Authorization: token
                    },
                    signal
                });

                if (!response.ok) {
                    return;
                }
                const data = await response.json();

                setSearchedUsers((prevSearchedUsers) => {
                    return [
                        ...data.users
                    ]
                })
            }
            catch (e) {

            }

            setShowSpinner(false);
            // console.log(data.users);
        }


        if (searchQuery !== '') {
            fetchUsers();
        }
        else {
            setSearchedUsers([]);
        }

        return () => {
            abortController.abort();
        }

    }, [searchQuery, token]);

    function handleSearchQueryChange(value) {
        setSearchQuery(value);
    }

    function handleUserCardClick(id) {
        setIsUserProfilePaneOpen(true);
        setClickedUserID(id);

        setClickedUser(searchedUsers.find((user) => user._id === id) ? searchedUsers.find((user) => user._id === id) : {});
    }



    return (
        <>
            <div className="w-full">

                <div className="p-2">
                    <SearchBar placeholder={'Search users by username'} searchQuery={searchQuery} onSearchQueryChange={handleSearchQueryChange} />
                </div>

                {showSpinner && <div className="mt-2 overflow-hidden"><Spinner /></div>}

                <div>
                    {
                        searchedUsers.map((user, index) => {
                            return <UserCard key={index} id={user._id} username={user.username} name={user.name} pfp={user.pfp ? user.pfp : pfp} onUserCardClick={handleUserCardClick} />
                        })
                    }
                </div>

            </div>

            
        </>
    )
}

export default AddFriendPaneBody;