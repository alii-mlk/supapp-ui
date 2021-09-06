import React, { createContext, useState } from 'react';


export const CurrentUserContext = createContext();

const CurrentUserContextProvider = (props) => {
    const [user, setUser] = useState({
        token: '',
        userName: '',
        id: '',
        isLoggedIn: false,
    });
    const logOutHandler = () => {
        console.log('logout handler invoked')
        setUser({
            token: '',
            isLoggedIn: false,
            username: ''
        })
    }
    const loginHandler = (token, username, id) => {
        setUser({
            token: token,
            username: username,
            isLoggedIn: true,
            id: id
        });
    }
    return (
        <CurrentUserContext.Provider value={{ user, logOutHandler, loginHandler }}>
            {props.children}
        </CurrentUserContext.Provider>
    )
}
export default CurrentUserContextProvider