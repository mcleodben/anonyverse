import { useRef } from "react";
import Card from "./Card";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

export default function PostForm() {
    const {location, user} = useStateContext()
    const postRef = useRef(null)
    
    function createPost(event) {
        event.preventDefault()

        const payload = {
            user_id   : user.id,
            content   : postRef.current.value,
            latitude  : location.latitude,
            longitude : location.longitude,
        }

        axiosClient.post('/create-post', payload)
            .then((response) => {
                
            })
    }

    return (
        <Card>
            <div className="flex gap-2">
                <textarea ref={postRef} className="grow p-3" placeholder="What's on your mind?"/>
            </div>

            <div className="flex gap-3 items-center mt-1">
                <div className="grow text-right">
                    <button onClick={createPost} className="bg-violet-900 text-white px-6 py-1 rounded-md">Post</button>
                </div>
            </div>
        </Card>
    )
}