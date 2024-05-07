import { useEffect, useState } from "react";
import Post from "../components/Post";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import Modal from "../components/Modal";
import Replies from "../components/Replies";

export default function Dashboard() {
    const {user, token, getUser, setLocation} = useStateContext()
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [showReplies, setShowReplies] = useState(false)
    const [postData, setPostData] = useState(null)

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
        })

    }, [user])

    function getPosts(location) {
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

    function showPostAndReplies(data) {
        setPostData(data)
        setShowReplies(true)
    }
    
    return (
        <div className="mt-4 max-w-4xl mx-auto gap-6">
            <h2 className="text-xl flex justify-center py-5">What people are saying near you</h2>

            {posts.map((post, i) => {                       
                return (
                    <div onClick={() => showPostAndReplies(post)} key={post.id} className="py-1 hover:cursor-pointer">
                        <Post post={post} />
                    </div>
                ) 
            })}

            <Modal isVisible={showReplies} onClose={() => setShowReplies(false)}>
                <Replies postData={postData} />
            </ Modal>
        </div>
    )
}