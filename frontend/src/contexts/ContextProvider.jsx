import axiosClient from "../axios-client";
import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user        : null,
    token       : null,
    location    : null,
    showModal   : false,
    setUser     : null,
    setToken    : null,
    setLocation : null,
    getUser     : null,
    setShowModal: null,
})

export function ContextProvider({children}) {
    const [user, _setUser] = useState(null)
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'))
    const [location, _setLocation] = useState({})
    const [showModal, _setShowModal] = useState(false)

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

    function setShowModal(value) {
        _setShowModal(value)
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
            showModal,
            setUser,
            setToken,
            setLocation,
            getUser,
            setShowModal,
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);