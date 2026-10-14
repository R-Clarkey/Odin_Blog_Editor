import { Link } from "react-router-dom";
export default function Home() {

    return (
        <>
            <main>
                <section className="hero">
                    <h1>Welcome to Your Journey</h1>
                    <p>This is the site to view and manage your posts.</p>
                    <Link to="/posts">View your posts</Link>
                </section>
            </main>
        </>
    )
}