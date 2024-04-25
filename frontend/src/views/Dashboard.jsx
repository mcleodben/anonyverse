import PostForm from "../components/PostForm";

export default function Dashboard() {
    return (
        <div className="max-w-[1000px] content-center">
            <PostForm></PostForm>
            <h1>Posts</h1>
        </div>
    )
}