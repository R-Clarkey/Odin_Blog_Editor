import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Editor } from "@tinymce/tinymce-react"
import DOMPurify from "dompurify"
import { getPost, updatePost, deletePost } from "../api/posts"
import "../styles/post.css"

export default function Post() {
	const { id } = useParams()
	const navigate = useNavigate()
	const [post, setPost] = useState(null)
	const [content, setContent] = useState("")
	const [isEditing, setIsEditing] = useState(false)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState("")

	useEffect(() => {
		async function loadPost() {
			try {
				setLoading(true)
				const data = await getPost(id)
				setPost(data)
				setContent(data.content || "")
			} catch (err) {
				setError(err.message)
			} finally {
				setLoading(false)
			}
		}

		loadPost()
	}, [id])

	async function handleSave() {
		const cleanedContent = DOMPurify.sanitize(content)

		await updatePost(id, {
			content: cleanedContent
		})

		setPost((prev) => ({
			...prev,
			content: cleanedContent
		}))
		setContent(cleanedContent)
		setIsEditing(false)
	}

	function handleCancel() {
		setContent(post.content || "")
		setIsEditing(false)
	}

	async function handleRemove() {
		const confirmed = window.confirm("Delete this post?")
		if (!confirmed) return

		try {
			await deletePost(id)
			navigate("/posts")
			console.log("Reached")
		} catch (error) {
			console.error("Delete failed:", error)
		}
	}

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error: {error}</p>
	if (!post) return <p>Post not found.</p>

	return (
		<main className="post-page">
			<button className="back-btn" onClick={() => navigate("/posts")}>
				← Back to Posts
			</button>

			<article className="post-detail">
				<header className="post-detail-header">
					<h1 className="post-detail-title">{post.title || "Default title"}</h1>

					<div className="post-actions">
						<button
							className="edit-btn"
							onClick={isEditing ? handleCancel : () => setIsEditing(true)}
						>
							{isEditing ? "Cancel" : "Edit"}
						</button>

						{isEditing && (
							<button className="save-btn" onClick={handleSave}>
								Save
							</button>
						)}

						<button className="remove-btn" onClick={handleRemove}>
							Remove
						</button>
					</div>
				</header>

				{isEditing ? (
					<Editor
						apiKey={import.meta.env.VITE_TINY_API}
						value={content}
						onEditorChange={(newValue) => setContent(newValue)}
						init={{
							height: 400,
							menubar: false
						}}
					/>
				) : (
					<div
						className="post-detail-content"
						dangerouslySetInnerHTML={{ __html: content || "No content added" }}
					/>
				)}

				<span className={`post-status ${post.published ? "is-published" : ""}`}>
					{post.published ? "Published" : "Draft"}
				</span>
			</article>
		</main>
	)
}
