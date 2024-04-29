import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Card from "./Card";

export default function Post({post}) {
    return (
        <Card>
            <div className="flex">
                <div className="px-4 w-full">
                    <div className="py-1">
                        <p>
                            {post.content}
                        </p>         
                    </div>
                    <div className="flex justify-between py-1">
                        <div>
                            <p className="text-gray-500 text-sm">{post.created_at}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">2 replies</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">{post.distance}</p>
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
        </Card>
    )
}