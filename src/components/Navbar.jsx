import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login")
  }

    return (
        <nav className="navbar">
            <div className="nav-title">Your Journey</div>
            <div className="nav-links">
                {token ? (
                <>
                    <NavLink to="/" className="nav-link">
                        Home
                    </NavLink>
                    <NavLink to="/posts" className="nav-link">
                        My Posts
                    </NavLink>
                    <NavLink to="/about" className="nav-link">
                        About
                    </NavLink>
                    <button className="logout-btn" onClick={handleLogOut}>
                        Logout
                    </button>
                    </>
                    ) : (
                    <>
                    <NavLink to="/login" className="nav-link">
                        Login
                    </NavLink>
                    <NavLink to="/register" className="nav-link">
                        Register
                    </NavLink>
                </>
                )}
            </div>
        </nav>
    )
}
