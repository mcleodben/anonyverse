import { useStateContext } from "../contexts/ContextProvider.jsx";
import axiosClient from "../axios-client.js";
import { useRef, useState } from "react"
import { Link } from "react-router-dom"

export default function Signup() {
    const usernameRef        = useRef(null)
    const emailRef           = useRef(null)
    const passwordRef        = useRef(null)
    const confirmPasswordRef = useRef(null)

    const [errors, setErrors] = useState(null)
    const {setUser, setToken} = useStateContext()

    const register = (event) => {
        event.preventDefault()

        const payload = {
            username              : usernameRef.current.value,
            email                 : emailRef.current.value,
            password              : passwordRef.current.value,
            password_confirmation : confirmPasswordRef.current.value,
        }

        setErrors(null)

        axiosClient.post('/register', payload)
            .then((response) => {
                setUser(response.data.user)
                setToken(response.data.token)
            })
            .catch(error => {
                setErrors(error.response.data.errors)
            })
    }

    return (
        <div>
            <form onSubmit={register}>
                <h1 className="login-h1">Create an account</h1>

                <div className="h-5 text-red-400">{errors && <p>{errors.username}</p>}</div>
                <div className="relative my-4">
                    <input name="username" autoComplete="off" ref={usernameRef} type="text" placeholder="Username" className="login-text-input" />
                </div>

                <div className="h-5 text-red-400">{errors && <p>{errors.email}</p>}</div>
                <div className="relative my-4">
                    <input name="email" autoComplete="off" ref={emailRef} type="email" placeholder="Email Address" className="login-text-input" />
                </div>

                <div className="h-5 text-red-400">{errors && <p>{errors.password}</p>}</div>
                <div className="relative my-4">
                    <input name="password" autoComplete="off" ref={passwordRef} type="password" placeholder="Password" className="login-text-input" />
                </div>

                <div className="relative my-4">
                    <input name="confirmPassword" autoComplete="off" ref={confirmPasswordRef} type="password" placeholder="Confirm Password" className="login-text-input" />
                </div>

                <button className="login-btn">Register</button>
                <p>
                    Already registered? <Link to="/login">Log in here</Link>
                </p>
            </form>
        </div>
    )
}