import { useStateContext } from "../contexts/ContextProvider";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { FaEarthAmericas, FaUser, FaCirclePlus  } from "react-icons/fa6";
import { AiFillMessage } from "react-icons/ai";
import { RiMapPin2Fill } from "react-icons/ri";
import axiosClient from "../axios-client";
import Modal from "./Modal";
import PostForm from "./PostForm";

const NavBar = () => {
    const {user, token, showModal, setUser, setToken, setShowModal} = useStateContext()

    const logout = (event) => {
        event.preventDefault()

        axiosClient.post('/logout')
            .then((response) => {
                setUser(null)
                setToken(null)
            }
        )
    }

    function createPost() {
        setShowModal(true)
    }

    return (
        <header>
            <nav className="bg-slate-600 h-20 w-full">
                <div className="flex justify-between items-center">
                    <input type="checkbox" id="navbarShow" hidden />
                    <label htmlFor="navbarShow" className="float-right text-white text-3xl mr-10 lg:hidden"><FaBars /></label>

                    <div className="text-white pl-12 md:pl-24 md:text-4xl text-3xl">
                        <a href="#">The Anonyverse</a>
                    </div>
                    
                    <div className="flex items-center">
                        {token &&
                        <ul className="mr-10 lg:flex space-x-4 text-white uppercase rounded fixed lg:relative h-screen lg:h-0 w-screen lg:w-fit top-20 lg:top-0 transition-all duration-300 lg:transition-none text-center bg-slate-700">
                            <div className="navbar-icon">
                                <Link to="/explore"><FaEarthAmericas size="28" /></Link>
                            </div>

                            <div className="navbar-icon">
                                <Link to="/dashboard"><RiMapPin2Fill size="28" /></Link>
                            </div>

                            <div onClick={createPost} className="navbar-icon">
                                <FaCirclePlus size="28" />
                            </div>

                            <div className="navbar-icon">
                                <FaUser size="28" />
                            </div>

                            <div className="navbar-icon">
                                <AiFillMessage size="28" />
                            </div>
                        </ul>
                        }
                        {token ? <a href="#" onClick={logout}>Logout</a> : <a href="/login">Login</a>}
                    </div>
                </div>
            </nav>

            <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
                <PostForm />
            </ Modal>
        </header>
    )
}

export default NavBar
