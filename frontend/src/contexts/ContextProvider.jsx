import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user     : null,
    token    : null,
    location : null,
    setUser  : () => {},
    setToken : () => {},
    setLocation : () => {},
})

export const ContextProvider = ({children}) => {
    const [user, _setUser] = useState({})
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'))
    const [location, _setLocation] = useState({})

    const setUser = (user) => {
        _setUser(user)

        // navigator.geolocation.getCurrentPosition(success)
    }

    const setToken = (token) => {
        _setToken(token)

        token
            ? localStorage.setItem('ACCESS_TOKEN', token)
            : localStorage.removeItem('ACCESS_TOKEN');
    }

    const setLocation = (location) => {
        _setLocation(location)
    }

    return (
        <StateContext.Provider value={{
            user,
            token,
            location,
            setUser,
            setToken,
            setLocation,
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);