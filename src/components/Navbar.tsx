import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="bg-blue-700 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo / brand */}
        <Link to="/" className="text-2xl font-bold tracking-tight hover:text-blue-200">
          BidWave 🌊
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-blue-200 transition-colors">
            Browse
          </Link>
          <Link
            to="/sell"
            className="bg-white text-blue-700 px-4 py-1.5 rounded-full hover:bg-blue-100 transition-colors"
          >
            + List an Item
          </Link>
        </div>

      </div>
    </nav>
  );
}