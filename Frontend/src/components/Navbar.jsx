import { Link } from "react-router-dom";
function Navbar() {
    return (
        <nav className="navbar__container flex justify-between items-center bg-white h-12">
            <Link className="flex ml-30 text-2xl font-medium" to="/">Orbit</Link>

            <div className="flex gap-6 mr-30 text-sm font-medium">
                <a href="#features">Features</a>
                <a href="#how-it-works">How It Works</a>

                <Link to="/login">Login</Link>
                <Link to="/register">Get Started</Link>
            </div>
        </nav>
    );
}
export default Navbar;