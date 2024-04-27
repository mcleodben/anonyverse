import Avatar from "./Avatar";
import Card from "./Card";

export default function PostForm() {
    return (
        <Card>
            <div className="flex gap-2">
                <Avatar />
                
                <textarea className="grow p-3" placeholder="What's on your mind?"/>
            </div>

            <div className="flex gap-3 items-center mt-1">
                <div className="grow text-right">
                    <button className="bg-violet-900 text-white px-6 py-1 rounded-md">Post</button>
                </div>
            </div>
        </Card>
    )
}