import { useStateContext } from "../contexts/ContextProvider";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { FaEarthAmericas, FaUser } from "react-icons/fa6";
import axiosClient from "../axios-client";

const NavBar = () => {
    const {user, token, setUser, setToken} = useStateContext()

    const logout = (event) => {
        event.preventDefault()

        axiosClient.post('/logout')
            .then((response) => {
                setUser({})
                setToken(null)
            }
        )
    }

    return (
        <header>
            <nav className="bg-slate-600 h-20 w-full ">
                <div>
                    <input type="checkbox" id="navbarShow" hidden />
                    <label htmlFor="navbarShow" className="float-right text-white text-3xl mr-10 lg:hidden"><FaBars /></label>
                    <div className="text-white pl-12 md:pl-24 md:text-4xl text-3xl float-left">
                        <a href="#">The Anonyverse</a>
                    </div>

                    <div>
                        <ul className="mr-10 lg:flex space-x-4 text-white uppercase rounded fixed lg:relative h-screen lg:h-0 w-screen lg:w-fit top-20 lg:top-0 transition-all duration-300 lg:transition-none text-center bg-slate-700">
                            <li className="navbar-btn"><Link to="/dashboard">Explore</Link></li>
                            <li className="navbar-btn"><Link to="/users">Users</Link></li>
                        </ul>
                    </div>
                    
                    <div className="float-right">
                        {token ? <a href="#" onClick={logout}>Logout</a> : <a href="/login">Login</a>}
                    </div>
                </div>

                {/* <NavBarIcon icon={<FaEarthAmericas size="28" />} />
                <NavBarIcon icon={<FaUser size="28" />} /> */}
            </nav>
        </header>
    )
}

const NavBarIcon = ({ icon }) => (
    <div className="navbar-icon">
        {icon}
    </div>
)

export default NavBar