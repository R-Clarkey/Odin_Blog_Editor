import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Editor } from "@tinymce/tinymce-react"
import DOMPurify from "dompurify"
import { getPost, updatePost } from "../api/posts"
import "../styles/post.css"

export default function Post() {
	const { id } = useParams()
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

    

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error: {error}</p>
	if (!post) return <p>Post not found.</p>

	return (
		<main className="post-page">
			<article className="post-detail">
				<header className="post-detail-header">
					<h1 className="post-detail-title">{post.title}</h1>

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
						dangerouslySetInnerHTML={{ __html: content }}
					/>
				)}

				<span className={`post-status ${post.published ? "is-published" : ""}`}>
					{post.published ? "Published" : "Draft"}
				</span>
			</article>
		</main>
	)
}
