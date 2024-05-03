import { useEffect, useState } from "react";
import Post from "../components/Post";
import PostForm from "../components/PostForm";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Dashboard() {
    const {user, token, getUser, setLocation} = useStateContext()
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [showPostForm, setshowPostForm] = useState(false)

    useEffect(() => {
        if (!user && token) {
            getUser()
        }

        navigator.geolocation.getCurrentPosition((position) => {
            const location = {
                latitude  : position.coords.latitude,
                longitude : position.coords.longitude,
            }
            setLocation(location)
            getPosts(location)

            user ? setshowPostForm(true) : setshowPostForm(false)

            console.log(user)
            console.log(token)
        })

    }, [user])

    const getPosts = (location) => {
        const payload = {
            latitude  : location.latitude,
            longitude : location.longitude,
            radius    : 10,
        }

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
            {showPostForm && <PostForm />}
            <h2 className="text-xl flex justify-center py-5">What people are saying near you</h2>

            {posts.map((post, i) => {                       
                return (
                    <div key={post.id} className="py-1">
                        <Post post={post} />
                    </div>
                ) 
            })}
        </div>
    )
}