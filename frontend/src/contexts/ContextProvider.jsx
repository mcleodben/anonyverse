import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user     : null,
    token    : null,
    setUser  : () => {},
    setToken : () => {},
})

export const ContextProvider = ({children}) => {
    const [user, _setUser] = useState({})
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'))

    const setUser = (user) => {
        _setUser(user)
    }

    const setToken = (token) => {
        _setToken(token)

        token
            ? localStorage.setItem('ACCESS_TOKEN', token)
            : localStorage.removeItem('ACCESS_TOKEN');
    }
    
    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken,
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);