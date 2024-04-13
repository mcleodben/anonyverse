import { useStateContext } from "../contexts/ContextProvider";
import { Link, Navigate, Outlet } from "react-router-dom";

export default function DefaultLayout() {
    const {user, token} = useStateContext()

    if (!token) {
        return <Navigate to="/login" />
    }

    return (
        <div id="defaultLayout">
            <h2 className="text-4xl font-bold underline text-red-700">Title</h2>
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
            </aside>
            <div>
                <header>
                    <div className="text-red">
                        Header
                    </div>
                    <div>
                        User Info
                    </div>
                    <main>
                        <Outlet />
                    </main>
                </header>
            </div>
        </div>
    )
}