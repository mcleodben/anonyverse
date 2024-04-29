import { useEffect, useState } from "react";
import Post from "../components/Post";
import PostForm from "../components/PostForm";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Dashboard() {
    const {token} = useStateContext()
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const location = {
                latitude  : position.coords.latitude,
                longitude : position.coords.longitude,
            }

            getPosts(location)
        })

    }, [])

    const getPosts = (location) => {
        const payload = {
            latitude  : location.latitude,
            longitude : location.longitude,
            radius    : 10,
        }
        console.log(payload)

        axiosClient.post('/nearby-posts', payload)
            .then(({data}) => {
                setLoading(false)
                setPosts(data.data)
            })
            .catch(() => {
                setLoading(false)
            })
    }
    
    return (
        <div className="mt-4 max-w-4xl mx-auto gap-6">
            {token && <PostForm />}
            <h2 className="text-xl flex justify-center py-5">What people are saying near you</h2>

            {posts.map((post, i) => {                       
                return (<Post post={post} />) 
            })}
        </div>
    )
}