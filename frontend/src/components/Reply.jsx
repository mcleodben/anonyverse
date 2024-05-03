import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";
import Card from "./Card";

export default function Reply({reply}) {
    return (
        <Card>
            <div className="flex">
                <div className="px-4 w-full">
                    <div className="py-1">
                        <p>
                            {reply.content}
                        </p>         
                    </div>
                    <div className="flex justify-between items-center py-1">
                        <div className="flex items-center">
                            <MdAccessTimeFilled /><p className="text-gray-500 text-sm px-1">{reply.created_at}</p>
                        </div>
                    </div>
                </div>
                <div className="h-auto flex flex-col justify-center">
                    <div className="flex justify-center">
                        <FaChevronUp />
                    </div>
                    <div className="flex justify-center">
                        <p className="text-purple-900 text-sm">{reply.score}</p>
                    </div>
                    <div className="flex justify-center">
                        <FaChevronDown />
                    </div>
                </div>
            </div>
        </Card>
    )
}