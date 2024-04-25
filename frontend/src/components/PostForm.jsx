import Card from "./Card";

export default function PostForm() {
    return (
        <Card>
            <div className="flex gap-2">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=2598&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                </div>
                
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