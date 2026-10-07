import { Link } from "react-router-dom";
export default function Home() {

    return (
        <>
            <main>
                <section className="hero">
                    <h1>Welcome to Your Journey</h1>
                    <p>Post your own stories or read from others.</p>
                    <Link to="/posts">Read the latest posts</Link>
                </section>
            </main>
        </>
    )
}