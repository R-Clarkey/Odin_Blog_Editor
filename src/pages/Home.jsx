import { Link } from "react-router-dom"
import "../styles/home.css"

export default function Home() {
	return (
		<main className="home">
			<section className="hero">
				<div className="hero-content">
					<h1>Welcome to Your Journey</h1>
					<p>
						The Editor allows you to record your journey, you can publish your posts
                        and gain an audience that are eager to follow your journey along.
					</p>

					<div className="hero-actions">
						<Link to="/posts" className="primary-link">
							Manage your posts
						</Link>
						<Link to="/posts/create" className="secondary-link">
							Create a new post
						</Link>
					</div>
				</div>
			</section>

			<section className="home-grid">
				<div className="info-card">
					<h2>Manage Posts</h2>
					<p>
						Create, Edit and Publish new stories
					</p>
					<Link to="/posts" className="text-link">
						Go to posts →
					</Link>
				</div>
			</section>
		</main>
	)
}
