"use client";

import { useState } from "react";
import {
  FaBars,
  FaShoppingCart,
  FaGlobe,
  FaPlane,
  FaHotel,
  FaHome,
  FaCommentAlt,
  FaQuestionCircle,
  FaCog,
  FaUser
} from "react-icons/fa";
import NavItem from "./NavItem";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <nav className="flex items-center justify-between px-8 py-2 shadow fixed top-0 left-0 right-0 z-50 border-b border-gray-300">
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="cursor-pointer"
          >
            <FaBars size={24} />
          </button>
          <p className="text-xl font-bold flex space-x-1">
            <span className="text-blue-600">A</span>
            <span className="text-red-600">x</span>
            <span className="text-yellow-500">e</span>
            <span className="text-green-600">l</span>
          </p>
          <div className="hidden md:flex">
            <NavItem
              icon={<FaShoppingCart size={16} />}
              label="Travels"
              flexDirection="flex-row"
              href="/"
            />
            <NavItem
              icon={<FaGlobe size={16} />}
              label="Explore"
              flexDirection="flex-row"
              href="/explore"
            />
            <NavItem
              icon={<FaPlane size={16} />}
              label="Flights"
              flexDirection="flex-row"
              href="/flights"
            />
            <NavItem
              icon={<FaHotel size={16} />}
              label="Hotels"
              flexDirection="flex-row"
              href="/hotels"
            />
            <NavItem
              icon={<FaHome size={16} />}
              label="Vacation rentals"
              flexDirection="flex-row"
              href="/rentals"
            />
          </div>
        </div>
        <div>
          <button className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 cursor-pointer">
            <FaUser color="black" size={16} />
          </button>
        </div>
      </nav>
      {/* Left Navbar */}
      <nav
        className={`fixed top-0 left-0 h-full w-64 shadow-lg z-40 transform transition-transform duration-300 flex flex-col justify-between px-4 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="py-4 mt-14 md:mt-18 border-b border-gray-300 space-y-4">
          <NavItem
            icon={<FaShoppingCart size={16} />}
            label="Travels"
            flexDirection="flex-row"
            href="/"
          />
          <NavItem
            icon={<FaGlobe size={20} />}
            label="Explore"
            flexDirection="flex-row"
            href="/explore"
          />
          <NavItem
            icon={<FaPlane size={20} />}
            label="Flights"
            flexDirection="flex-row"
            href="/flights"
          />
          <NavItem
            icon={<FaHotel size={20} />}
            label="Hotels"
            flexDirection="flex-row"
            href="/hotels"
          />
          <NavItem
            icon={<FaHome size={20} />}
            label="Vacation rentals"
            flexDirection="flex-row"
            href="/rentals"
          />
        </div>
        <div className="py-4 border-t border-gray-300 space-y-4">
          <NavItem
            icon={<FaCog size={16} />}
            label="Settings"
            flexDirection="flex-row"
            href="/settings"
          />
          <NavItem
            icon={<FaCommentAlt size={20} />}
            label="Feedback"
            flexDirection="flex-row"
            href="/feedback"
          />
          <NavItem
            icon={<FaQuestionCircle size={20} />}
            label="Help"
            flexDirection="flex-row"
            href="/help"
          />
        </div>
      </nav>
    </>
  );
}
