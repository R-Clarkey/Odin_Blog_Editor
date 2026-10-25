import "../styles/about.css"
const VIEWER_URL = import.meta.env.VITE_VIEWER_URL
const BACKEND_REPO = import.meta.env.VITE_BACKEND_REPO
const VIEWER_REPO = import.meta.env.VITE_VIEWER_REPO
const EDITOR_REPO = import.meta.env.VITE_EDITOR_REPO


export default function About() {
	return (
		<main className="about-page">
			<section className="about-box">
				<h1>About This Project</h1>
				<p>
					This Blog Editor was part of the task from the 'Project: Blog API' lesson on 'The Odin Project'. The Editor allows
                    users to create and edit blog posts, featuring a rich text editor and a toggle on the published status. The 
					<a className="text-link" href={VIEWER_URL} target="_blank" rel="noreferrer"> Blog Viewer </a> 
					will allow any signed-in user view the posts which have been published.
				</p>
				<p>GitHub Repositories:</p>
				<ul>
					<li>Backend/API (<a className="text-link" href={BACKEND_REPO} target="_blank" rel="noreferrer">View</a>)</li>
					<li>Viewer (<a className="text-link" href={VIEWER_REPO} target="_blank" rel="noreferrer">View</a>)</li>
					<li>Editor (<a className="text-link" href={EDITOR_REPO} target="_blank" rel="noreferrer">View</a>)</li>

				</ul>
			</section>
		</main>
	)
}
