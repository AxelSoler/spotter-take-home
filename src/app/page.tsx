"use client";

import { FaSearch, FaGlobe, FaPlane, FaHotel, FaHome } from "react-icons/fa";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
import NavItem from "@/components/NavItem";

const PopularDestinations = dynamic(
  () => import("@/components/PopularDestinations"),
  {
    ssr: false
  }
);

export default function Home() {
  return (
    <div className="font-sans min-h-screen pt-20 max-w-screen-xl mx-auto">
      <header className="px-6">
        <picture>
          <source
            srcSet="https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_dark_theme_4.svg"
            media="(prefers-color-scheme: dark)"
          />
          <img
            src="https://www.gstatic.com/travel-frontend/animation/hero/trips_4.svg"
            alt="Travel Hero"
            className="w-full h-full"
          />
        </picture>
        <p className="text-4xl md:text-6xl text-center">Travels</p>
        <div className="flex items-center mx-auto bg-white px-4 py-3 rounded-full shadow-md w-full max-w-xl mt-10">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search for flights, hotels and more"
            className="flex-grow outline-none text-gray-700"
          />
        </div>

        <div className="flex justify-center gap-5 mt-4">
          <NavItem
            icon={<FaGlobe size={20} />}
            label="Explore"
            href="/explore"
          />
          <NavItem
            icon={<FaPlane size={20} />}
            label="Flights"
            href="/flights"
          />
          <NavItem icon={<FaHotel size={20} />} label="Hotels" href="/hotels" />
          <NavItem
            icon={<FaHome size={20} />}
            label="Vacation rentals"
            href="/rentals"
          />
        </div>
        <PopularDestinations />
      </header>
      <Footer />
    </div>
  );
}
