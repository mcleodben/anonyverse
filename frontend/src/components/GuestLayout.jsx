import { useStateContext } from "../contexts/ContextProvider";
import { Navigate, Outlet } from "react-router-dom";

export default function GuestLayout() {
    const {token} = useStateContext()

    if (token) {
        return <Navigate to="/" />
    }
    
    return (
        <div>
            <div>
                <h2 className="text-red">Title</h2>
                <p className="text-blue">For guest users only</p>
                
                <Outlet/>
            </div>
        </div>
    )
}