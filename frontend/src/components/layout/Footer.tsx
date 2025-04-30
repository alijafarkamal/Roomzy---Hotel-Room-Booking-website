
import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-600 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1">
          <h3 className="text-xl font-bold text-roomzy-blue mb-4">Roomzy</h3>
          <p className="mb-4">
            Book your perfect hotel room with ease and comfort.
          </p>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-500 hover:text-roomzy-blue">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-roomzy-blue">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.628 0-12 5.373-12 12s5.372 12 12 12 12-5.373 12-12-5.372-12-12-12zm5.515 8.466c.037.124.037.248.037.372 0 3.787-2.882 8.155-8.155 8.155-1.624 0-3.134-.473-4.403-1.296.229.027.456.037.685.037 1.345 0 2.582-.456 3.563-1.231-1.258-.027-2.318-.85-2.684-1.976.176.027.352.046.537.046.256 0 .511-.037.758-.101-1.314-.266-2.301-1.426-2.301-2.819v-.037c.388.213.825.341 1.293.359-.773-.516-1.278-1.396-1.278-2.394 0-.527.143-1.018.389-1.437 1.414 1.739 3.529 2.881 5.911 3 -.046-.213-.073-.435-.073-.658 0-1.587 1.287-2.874 2.882-2.874.828 0 1.576.349 2.102.909.651-.125 1.276-.366 1.834-.697-.216.675-.669 1.239-1.268 1.603.584-.064 1.149-.222 1.675-.445-.388.576-.871 1.084-1.433 1.494z" />
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-roomzy-blue">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-roomzy-blue">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.628 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.873 16.827c.199.357.477.613.982.613.953 0 1.145-.779 1.145-1.73v-5.71h1.79v6.588c0 2.058-1.226 2.986-2.906 2.986-1.477 0-2.349-.731-2.786-1.754l1.775-.997zm-3.873 4.156c-6.615 0-12-5.385-12-12s5.385-12 12-12 12 5.385 12 12c0 6.616-5.385 12-12 12z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="col-span-1">
          <h4 className="font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-roomzy-blue transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/rooms" className="hover:text-roomzy-blue transition-colors">
                Rooms
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-roomzy-blue transition-colors">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-roomzy-blue transition-colors">
                Register
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-span-1">
          <h4 className="font-bold mb-4">Our Policies</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-roomzy-blue transition-colors">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-roomzy-blue transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-roomzy-blue transition-colors">
                Cookie Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-roomzy-blue transition-colors">
                Cancellation Policy
              </a>
            </li>
          </ul>
        </div>

        <div className="col-span-1">
          <h4 className="font-bold mb-4">Contact Us</h4>
          <ul className="space-y-3">
            <li className="flex items-center">
              <MapPin size={18} className="mr-2 text-roomzy-blue" />
              <span>123 Hotel Street, City, Country</span>
            </li>
            <li className="flex items-center">
              <Phone size={18} className="mr-2 text-roomzy-blue" />
              <span>+1 (555) 123-4567</span>
            </li>
            <li className="flex items-center">
              <Mail size={18} className="mr-2 text-roomzy-blue" />
              <span>info@roomzy.com</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-200">
        <p className="text-center text-sm">
          © {new Date().getFullYear()} Roomzy. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
