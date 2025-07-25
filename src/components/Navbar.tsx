import { FaShoppingCart, FaGlobe, FaPlane, FaHotel, FaHome } from "react-icons/fa";
import NavItem from "./NavItem";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-2 shadow fixed top-0 left-0 right-0 z-50 border-b border-gray-300">
      <div className="flex gap-8">
        <NavItem icon={<FaShoppingCart size={16} />} label="Travels" flexDirection="flex-row" />
        <NavItem icon={<FaGlobe size={16} />} label="Explore" flexDirection="flex-row" />
        <NavItem icon={<FaPlane size={16} />} label="Flights" flexDirection="flex-row" />
        <NavItem icon={<FaHotel size={16} />} label="Hotels" flexDirection="flex-row" />
        <NavItem icon={<FaHome size={16} />} label="Vacation rentals" flexDirection="flex-row" />
      </div>
      <div>
        <button className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
    </nav>
  );
}