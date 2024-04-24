import {createBrowserRouter} from "react-router-dom";
import {Navigate} from "react-router-dom";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";
import Users from "./views/Users";
import DefaultLayout from "./components/DefaultLayout";
import LoginRegisterLayout from "./components/LoginRegisterLayout";
import Dashboard from "./views/Dashboard";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/dashboard" />
            },
            {
                path: '/users',
                element: <Users />,
            },
            {
                path: '/dashboard',
                element: <Dashboard />,
            },
        ]
    },
    {
        path: '/',
        element: <LoginRegisterLayout />,
        children: [
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/register',
                element: <Signup />,
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />,
    },
])

export default router;