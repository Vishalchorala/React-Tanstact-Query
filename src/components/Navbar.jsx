import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between gap-6 shadow-md">
            <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
            <div className='flex gap-10'>
                <Link to="/fetch" className="hover:text-yellow-400 transition">Fetch Posts</Link>
                <Link to="/pagination" className="hover:text-yellow-400 transition">Paginated Posts</Link>
                <Link to="/infinite" className="hover:text-yellow-400 transition">Infinite Scroll</Link>
            </div>
        </nav>
    )
}

export default Navbar