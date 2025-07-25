import Image from "next/image";
import { FaSearch, FaGlobe, FaPlane, FaHotel, FaHome } from "react-icons/fa";
import NavItem from "./NavItem";

export default function Header() {
  return (
    <header className="py-6">
      <Image
        src="https://www.gstatic.com/travel-frontend/animation/hero/trips_4.svg"
        alt="Travel Hero"
        width={1200}
        height={400}
        className="w-full h-full"
        priority
      />
      <p className="text-6xl text-center">Flights</p>
      <div className="flex items-center mx-auto bg-white px-4 py-3 rounded-full shadow-md w-full max-w-xl mt-10">
        <FaSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search for flights, hotels and more"
          className="flex-grow outline-none text-gray-700"
        />
      </div>

      <div className="flex justify-center gap-10 mt-4">
        <NavItem icon={<FaGlobe size={20} />} label="Explore" />
        <NavItem icon={<FaPlane size={20} />} label="Flights" />
        <NavItem icon={<FaHotel size={20} />} label="Hotels" />
        <NavItem icon={<FaHome size={20} />} label="Vacation rentals" />
      </div>
    </header>
  );
}
