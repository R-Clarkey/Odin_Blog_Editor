import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getMyPosts, updatePost } from "../api/posts.js"
import "../styles/posts.css"

function getPreviewText(html, maxLength = 120) {
	const temp = document.createElement("div")
	temp.innerHTML = html
	const text = temp.textContent || temp.innerText || ""

	return text.length > maxLength
		? text.slice(0, maxLength) + "..."
		: text
}

export default function Posts() {
	const [posts, setPosts] = useState([])
	const [error, setError] = useState("")
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function loadPosts() {
			try {
				const data = await getMyPosts()
				setPosts(data)
			} catch (err) {
				setError(err.message)
			} finally {
				setLoading(false)
			}
		}

		loadPosts()
	}, [])

	async function handleToggle(post) {
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
						<Link className="post-link" to={`/post/${post.id}`}>
							<h2 className="post-title">{post.title}</h2>
							<p className="post-content">
								{getPreviewText(post.content, 120)}
							</p>
							<div className="post-meta">
								<span>{post.author?.name}</span>
								<span>{new Date(post.createdAt).toLocaleDateString()}</span>
							</div>
						</Link>
						<button
							type="button"
							className="publish-button"
							onClick={() => handleToggle(post)}
						>
							{post.published ? "Published" : "Draft"}
						</button>
					</li>
				))}
			</ul>
		</main>
	)
}
