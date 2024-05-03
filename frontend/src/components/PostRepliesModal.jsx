import Reply from "./Reply";

export default function PostRepliesModal({ open, replies, onClose }) {
    if (!open) {
        return null
    }

    return (
        <div className="flex justify-center items-center bg-white" onClick={onClose}>
            {replies.map((reply, i) => {                       
                return (
                    <div key={reply.id} className="py-1">
                        <Reply reply={reply} />
                    </div>
                ) 
            })}
        </div>
    )
}