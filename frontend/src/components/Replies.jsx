import Card from "./Card";
import Post from "./Post";
import Reply from "./Reply";

export default function Replies({ postData }) {
    return (
        <Card>
            <div className="justify-center items-center">
                <Post post={postData} />
                <h3 className="text-center p-3">Replies</h3>
                {postData.replies.map((reply, i) => {                       
                    return (
                        <div key={reply.id} className="py-1">
                            <Reply reply={reply} />
                        </div>
                    ) 
                })}
            </div>
        </Card>
    )
}