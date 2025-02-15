import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-gray-800">
            Library Manager
          </Link>
          <div className="flex space-x-4">
            <Link to="/" className="text-gray-600 hover:text-gray-800">Dashboard</Link>
            <Link to="/books" className="text-gray-600 hover:text-gray-800">Books</Link>
            <Link to="/members" className="text-gray-600 hover:text-gray-800">Members</Link>
            <Link to="/loans" className="text-gray-600 hover:text-gray-800">Loans</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;