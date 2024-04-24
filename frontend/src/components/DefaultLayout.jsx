import { useStateContext } from "../contexts/ContextProvider";
import { Navigate, Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { useEffect } from "react";
import axiosClient from "../axios-client";

export default function DefaultLayout() {
    const {user, token, setUser} = useStateContext()

    // if (!token) {
    //     return <Navigate to="/login" />
    // }

    // useEffect(() => {
    //     axiosClient.get('/user')
    //         .then((response) => {
    //             console.log(response.data)
    //             setUser(response.data)
    //         })
    // })

    return (
        <div>
            <header>
                <NavBar />
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    )
}