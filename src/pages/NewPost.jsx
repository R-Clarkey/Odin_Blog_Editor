import { useNavigate } from "react-router-dom"
import "../styles/newPost.css"
import { useState } from "react"
import { apiConnect } from "../api/client";

export default function NewPost() {
	const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
            const post = await apiConnect("/posts", {
                method: "POST",
                body: JSON.stringify({
                    title,
                    content
                })
            })
            navigate("/posts")
        } catch (error) {
            console.log(error.message)
        }
	}

	return (
		<main className="new-post-page">
			<button type="button" className="back-btn" onClick={() => navigate("/posts")}>
				← Back to Posts
			</button>

			<article className="post-detail">
				<header className="post-detail-header">
					<h1 className="post-detail-title">Create a post</h1>
				</header>

				<form className="new-post-form" onSubmit={handleSubmit}>
					<label className="form-field">
						<span>Title</span>
						<input
							type="text"
							name="title"
							placeholder="Enter a title"
							className="form-input"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
						/>
					</label>

					<label className="form-field">
						<span>Content</span>
						<textarea
							name="content"
							placeholder="Write your content..."
							className="form-textarea"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
						/>
					</label>

					<div className="form-actions">
						<button
							type="button"
							className="cancel-btn"
							onClick={() => navigate("/posts")}
						>
							Cancel
						</button>

						<button type="submit" className="save-btn">
							Save Draft
						</button>
					</div>
				</form>
			</article>
		</main>
	)
}
