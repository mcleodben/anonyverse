import { useStateContext } from "../contexts/ContextProvider.jsx";
import { Link } from "react-router-dom"
import { BiUser } from "react-icons/bi"
import { AiOutlineUnlock } from "react-icons/ai"
import { useRef, useState } from "react";
import axiosClient from "../axios-client.js";

export default function Login() {
    const emailRef    = useRef(null)
    const passwordRef = useRef(null)

    const [errors, setErrors] = useState(null)
    const {setUser, setToken} = useStateContext()

    const submit = (event) => {
        event.preventDefault()

        const payload = {
            email    : emailRef.current.value,
            password : passwordRef.current.value,
        }

        setErrors(null)

        axiosClient.post('/login', payload)
            .then((response) => {
                setUser(response.data.user)
                setToken(response.data.token)
            })
            .catch(error => {
                setErrors(error.response.data)
            })
    }

    return (
        <div>
            <form onSubmit={submit}>
                <h1 className="login-h1">Log in to your account</h1>

                {errors && 
                <div className="text-red-400">
                    {errors.message}
                </div>
                }
                
                <div className="relative my-4">
                    <input ref={emailRef} autoComplete="off" type="email" placeholder="Email" className="login-text-input"/>
                    <BiUser className="absolute top-0 right-4"/>
                </div>
                <div className="relative my-4">
                    <input ref={passwordRef} autoComplete="off" type="password" placeholder="Password" className="login-text-input"/>
                    <AiOutlineUnlock className="absolute top-0 right-4"/>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <input type="checkbox" />
                        <label htmlFor="Remember Me">Remember Me</label>
                    </div>
                    <span className="text-blue-500">Forgot Password?</span>
                </div>
                
                <button className="login-btn">Login</button>
                <p>
                    Not registered? <Link to="/register">Create an account</Link>
                </p>
            </form>
        </div>
    )
}