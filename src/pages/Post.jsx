import { useEffect, useState } from "react"
import { getPost } from "../api/posts"
import { useParams } from "react-router-dom"
import "../styles/post.css"

export default function Post() {
	const { id } = useParams()
	const [post, setPost] = useState(null)
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function loadPost() {
			try {
				setLoading(true)
				const data = await getPost(id)
                console.log(data)
				setPost(data)
			} catch (err) {
				setError(err.message)
			} finally {
				setLoading(false)
			}
		}

		loadPost()
	}, [id])

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error: {error}</p>
	if (!post) return <p>Post not found.</p>

	return (
		<main className="post-page">
			<article className="post-detail">
				<header className="post-detail-header">
					<h1 className="post-detail-title">{post.title}</h1>
					<div className="post-meta">
						<span>{post.author?.name ?? "Unknown author"}</span>
						<time dateTime={post.createdAt}>
							{new Date(post.createdAt).toLocaleDateString()}
						</time>
					</div>
				</header>

				<p className="post-detail-content">{post.content}</p>

				<span className={`post-status ${post.published ? "is-published" : ""}`}>
					{post.published ? "Published" : "Draft"}
				</span>

				<section className="post-comments">
					<h2>Comments</h2>
					{post.comments?.length ? (
						post.comments.map((comment) => (
							<p key={comment.id}>{comment.content}</p>
						))
					) : (
						<p>No comments yet.</p>
					)}
				</section>
			</article>
		</main>
	)
}
