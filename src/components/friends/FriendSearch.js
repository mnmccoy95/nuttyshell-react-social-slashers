import React, { useContext, useEffect, useState } from "react"
import { FriendContext } from "./FriendProvider"
import { UserContext } from "./UserProvider"
import { UserCard } from "./UserCard"

export const FriendSearch = () => {
    const { searchTerms, setSearchTerms } = useContext(UserContext)

    return (
        <>
            Friend search:
            <input type="text"
                className="input--wide"
                onKeyUp={
                    (keyEvent) => setSearchTerms(keyEvent.target.value)
                }
                placeholder="Search for a user... " />
        </>
    )
}

export const UserList = () => {
    const { users, getUsers, searchTerms } = useContext(UserContext)
    const { friends, getFriends } = useContext(FriendContext)

    // Since you are no longer ALWAYS displaying all of the users
    const [ filteredUsers, setFiltered ] = useState([])

    // dependency array is friends, so useEffect runs when friends changes state
    useEffect(() => {
        getFriends()
        .then(getUsers)
    }, [friends])

    // useEffect dependency array with dependencies - will run if dependency changes (state)
    // searchTerms will cause a change
    useEffect(() => {
        if (searchTerms !== "") {
            // If the search field is not blank, display matching animals
            const subset = users.filter(user => user.name.toLowerCase().includes(searchTerms.toLowerCase()))
            setFiltered(subset)
        } else {
            // If the search field is blank, display all unadded users
            setFiltered(users)
        }
    }, [searchTerms, users, friends])

    return (
        <>
            <h1>Users</h1>

            <div className="users">
				{
				filteredUsers.map(user => {
					return <UserCard key={user.id} user={user} />
				})
				}
			</div>
        </>
    )
}