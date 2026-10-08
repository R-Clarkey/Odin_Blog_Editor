import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getMyPosts, updatePost } from "../api/posts.js"
import "../styles/posts.css"

export default function Posts() {
	const [posts, setPosts] = useState([])
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function loadPosts() {
			try {
				const data = await getMyPosts()
				setPosts(data)
				console.log("Posts", data)
			} catch (err) {
				setError(err.message)
			} finally {
				setLoading(false)
			}
		}

		loadPosts()
	}, [])

	async function handleToggle(post) {
		console.log(import.meta.env.VITE_API_URL)
		try {
			const changes = {
				published: !post.published,
			}

			await updatePost(post.id, changes)

			setPosts(prevPosts =>
				prevPosts.map(p =>
					p.id === post.id
						? { ...p, published: !p.published }
						: p
				)
			)
		} catch (err) {
			setError(err.message)
		}
	}


	if (loading) return <p>Loading posts…</p>
	if (error) return <p role="alert">{error}</p>

	return (
		<main className="posts-page">
			<ul className="posts-grid">
				{posts.map((post) => (
					<li key={post.id} className="post-card">
						<h2 className="post-title">{post.title}</h2>
						<p className="post-content">
							{post.content.length > 120
								? post.content.slice(0, 120) + "..."
								: post.content}
						</p>
						<div className="post-meta">
							<span>{post.author?.name}</span>
							<span>{new Date(post.createdAt).toLocaleDateString()}</span>
						</div>
						<button onClick={() => handleToggle(post)} className="publish-button">
							{post.published ? "Published" : "Draft"}
						</button>
						<Link to={`/post/${post.id}`}>View post</Link>
					</li>
				))}
			</ul>
		</main>
	)
}
