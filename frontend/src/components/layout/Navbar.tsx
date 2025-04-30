
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // For demo purposes, toggle login status
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  // For demo purposes, toggle admin status
  const toggleAdmin = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <nav className="bg-white shadow-sm py-4 px-6 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold text-roomzy-blue">Roomzy</h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-roomzy-blue transition-colors">
            Home
          </Link>
          <Link to="/rooms" className="text-gray-600 hover:text-roomzy-blue transition-colors">
            Rooms
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="text-gray-600 hover:text-roomzy-blue transition-colors">
                My Bookings
              </Link>
              {isAdmin && (
                <Link to="/admin" className="text-gray-600 hover:text-roomzy-blue transition-colors">
                  Admin
                </Link>
              )}
              <Button variant="outline" onClick={toggleLogin}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}
          {/* Dev tools for demo */}
          <Button
            size="sm"
            variant="ghost"
            onClick={toggleAdmin}
            className="text-xs bg-gray-100"
          >
            {isAdmin ? "Disable Admin" : "Enable Admin"}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-500 hover:text-roomzy-blue focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white py-4 px-6 mt-2 shadow-md">
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-roomzy-blue transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/rooms"
              className="text-gray-600 hover:text-roomzy-blue transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Rooms
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-600 hover:text-roomzy-blue transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  My Bookings
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="text-gray-600 hover:text-roomzy-blue transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                <Button variant="outline" onClick={() => { toggleLogin(); setIsOpen(false); }}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full">Login</Button>
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <Button className="w-full">Register</Button>
                </Link>
              </>
            )}
            {/* Dev tools for demo */}
            <Button
              size="sm"
              variant="ghost"
              onClick={() => { toggleAdmin(); setIsOpen(false); }}
              className="text-xs bg-gray-100"
            >
              {isAdmin ? "Disable Admin" : "Enable Admin"}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
