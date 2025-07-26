"use client";

import Link from "next/link";
import NavItem from "@/components/NavItem";
import {
  FaExchangeAlt,
  FaMapMarkerAlt,
  FaSearch,
  FaUser
} from "react-icons/fa";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Flights() {
  return (
    <div className="min-h-screen pt-20 px-4 max-w-screen-xl mx-auto">
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
      <p className="text-4xl md:text-6xl text-center">Flights</p>
      <div className="bg-gray-800 text-white p-4 rounded-xl flex flex-col gap-3 max-w-4xl mx-auto mt-4 relative pb-10">
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-2">
            <FaExchangeAlt className="text-gray-400" />
            Round trip
          </span>
          <span className="flex items-center gap-2">
            <FaUser className="text-gray-400" />2
          </span>
          <span className="flex items-center gap-1">
            Economy class
            <span className="text-gray-400">▼</span>
          </span>
        </div>

        <div className="flex flex-wrap md:flex-nowrap bg-gray-700 rounded-lg overflow-hidden">
          <div className="flex items-center px-4 py-3 border-r border-gray-600 flex-1">
            <input
              type="text"
              placeholder="City"
              className="bg-transparent outline-none text-white flex-1 placeholder:text-gray-400"
            />
          </div>

          <div className="flex items-center justify-center px-3 border-r border-gray-600 text-gray-400">
            <FaExchangeAlt />
          </div>

          <div className="flex items-center px-4 py-3 border-r border-gray-600 flex-1">
            <FaMapMarkerAlt className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Where you want to go?"
              className="bg-transparent outline-none text-white flex-1 placeholder:text-gray-400"
            />
          </div>

          <div className="flex items-center">
            <div className="flex items-center px-4 py-3 border-r border-gray-600 text-gray-400">
              <input
                type="date"
                placeholder="Departure"
                className="bg-transparent outline-none text-white flex-1 placeholder:text-gray-400"
              />
            </div>
            <div className="flex items-center px-4 py-3 text-gray-400">
              <input
                type="date"
                placeholder="Return"
                className="bg-transparent outline-none text-white flex-1 placeholder:text-gray-400"
              />
            </div>
          </div>

        </div>

        <div className="flex justify-center w-fit mx-auto absolute bg-blue-500 md:bg-transparent px-4 rounded-full -bottom-5 md:-bottom-7 right-0 left-0">
          <NavItem
            icon={<FaSearch size={20} />}
            label="Explore"
            href="/explore"
            flexDirection="flex-row"
          />
        </div>
      </div>

      <div className="relative w-full h-[300px] rounded-xl overflow-hidden border shadow mt-10">
        <Link href={"/explore"} className="absolute z-[1001] inset-0 flex items-center justify-center">
          <h2 className="text-white bg-gray-500 text-xl md:text-3xl font-bold drop-shadow-lg p-4 rounded-full">
            Explore Destinations
          </h2>
        </Link>

        <MapContainer
          center={[20, 0]}
          zoom={2}
          scrollWheelZoom={false}
          dragging={false}
          zoomControl={false}
          className="w-full h-full"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
    </div>
  );
}
