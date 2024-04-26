import { Link } from "react-router-dom"
import axiosClient from "../axios-client"
import { useEffect, useState } from "react"

export default function Users() {
    const [users, setUser] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = () => {
        setLoading(true)

        axiosClient.get('/users')
            .then(({data}) => {
                setLoading(false)
                console.log(data)
            })
            .catch(() => {
                setLoading(false)
            })
    }

    return (
        <div>
            <div>
                <h1>Users</h1>
            </div>
        </div>
    )
}