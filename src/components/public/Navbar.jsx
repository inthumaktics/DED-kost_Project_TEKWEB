    import { Link } from 'react-router-dom'

    const Navbar = () => {
    return (
        <nav className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">
            KostFinder
            </Link>
            <div className="space-x-6">
            <Link to="/" className="hover:text-blue-200 transition">
                Home
            </Link>
            <Link to="/admin" className="hover:text-blue-200 transition">
                Admin Panel
            </Link>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition">
                Login
            </button>
            </div>
        </div>
        </nav>
    )
    }

    export default Navbar