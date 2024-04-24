import { useStateContext } from "../contexts/ContextProvider";
import { Navigate, Outlet } from "react-router-dom";

export default function GuestLayout() {
    const {token} = useStateContext()

    if (token) {
        return <Navigate to="/" />
    }
    
    return (
        <div className="text-white h-screen flex justify-center items-center bg-cover">
            <div className="bg-slate-900 border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">  
                <Outlet/>
            </div>
        </div>
    )
}