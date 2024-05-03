import axiosClient from "../axios-client";
import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user        : null,
    token       : null,
    location    : null,
    setUser     : null,
    setToken    : null,
    setLocation : null,
    getUser     : null,
})

export function ContextProvider({children}) {
    const [user, _setUser] = useState(null)
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'))
    const [location, _setLocation] = useState({})

    function setUser(user) {
        _setUser(user)
    }

    function setToken(token) {
        _setToken(token)

        token
            ? localStorage.setItem('ACCESS_TOKEN', token)
            : localStorage.removeItem('ACCESS_TOKEN');
    }

    function setLocation(location) {
        _setLocation(location)
    }

    function getUser() {
        axiosClient.get('/user')
            .then(({data}) => {
                setUser(data)
            })
    }

    return (
        <StateContext.Provider value={{
            user,
            token,
            location,
            setUser,
            setToken,
            setLocation,
            getUser,
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);