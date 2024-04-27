import { useEffect, useState } from "react";
import Post from "../components/Post";
import PostForm from "../components/PostForm";
import axiosClient from "../axios-client";

export default function Dashboard() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getPosts()
    }, [])

    // Possibly delete radius from payload and do it automatically.
    const payload = {
        latitude  : null,
        longitude : null,
        radius    : 10,
    }

    function success(position) {
        payload.latitude  = position.coords.latitude;
        payload.longitude = position.coords.longitude;
    }
    
    function error() {
        console.log("Unable to retrieve your location");
    }

    console.log(payload)

    const getPosts = () => {
        setLoading(true)

        navigator.geolocation.getCurrentPosition(success, error)
        // Fix this to get users coords etc etc

        axiosClient.post('/nearby-posts', payload)
            .then(({data}) => {
                setLoading(false)
                setPosts(data.data)
            })
            .catch(() => {
                setLoading(false)
            })
        
            console.log(posts)
    }
    
    return (
        <div className="mt-4 max-w-4xl mx-auto gap-6">
            <PostForm />
            <h2 className="text-xl flex justify-center py-5">What people are saying near you</h2>

            {posts.map((post, i) => {                       
                return (<Post post={post} />) 
            })}
        </div>
    )
}