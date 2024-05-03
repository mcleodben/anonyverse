import { FaChevronDown, FaChevronUp, FaCommentAlt } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import Card from "./Card";
import { useState } from "react";
import PostRepliesModal from "./PostRepliesModal";

export default function Post({post}) {
    const [replyModalOpen, setReplyModalOpen] = useState(false)

    return (
        <Card>
            <div className="flex">
                <div className="px-4 w-full">
                    <div className="py-1 hover:cursor-pointer" onClick={() => setReplyModalOpen(true)}>
                        <p>
                            {post.content}
                        </p>         
                    </div>
                    <div className="flex justify-between items-center py-1">
                        <div className="flex items-center">
                            <MdAccessTimeFilled /><p className="text-gray-500 text-sm px-1">{post.created_at}</p>
                        </div>
                        {post.replies.length > 0 &&
                        <div className="flex items-center hover:cursor-pointer" onClick={() => setReplyModalOpen(true)}>
                            <FaCommentAlt /><p className="text-gray-500 text-sm px-1">{post.replies.length} {post.replies.length === 1 ? 'reply' : 'replies'}</p>
                        </div>
                        }
                        <div className="flex items-center">
                            <FaLocationDot /><p className="text-gray-500 text-sm px-1">{post.distance}</p>
                        </div>
                    </div>
                </div>
                <div className="h-auto flex flex-col justify-center">
                    <div className="flex justify-center">
                        <FaChevronUp />
                    </div>
                    <div className="flex justify-center">
                        <p className="text-purple-900 text-sm">{post.score}</p>
                    </div>
                    <div className="flex justify-center">
                        <FaChevronDown />
                    </div>
                </div>
            </div>

            <PostRepliesModal replies={post.replies} open={replyModalOpen} onClose={() => setReplyModalOpen(false)} />
        </Card>
    )
}