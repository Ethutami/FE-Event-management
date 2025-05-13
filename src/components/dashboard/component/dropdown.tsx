"use client"

import { useState, useRef } from "react";
import { User, ChevronDown, Settings, LogOut, HelpCircle } from "react-feather";

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium">
          <User className="w-4 h-4" />
        </div>
        <span className="hidden md:inline text-sm font-medium">Organizer</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 hidden md:block transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-indigo-500 ring-opacity-5 focus:outline-none z-50 transition-all duration-100">
          <div className="px-1 py-1">
            <button className="text-gray-900 hover:bg-indigo-500 hover:text-white group flex w-full items-center rounded-md px-2 py-2 text-sm">
              <User className="mr-2 h-4 w-4" />
              Profile
            </button>
            <button className="text-gray-900 hover:bg-indigo-500 hover:text-white group flex w-full items-center rounded-md px-2 py-2 text-sm">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </button>
          </div>
          <div className="px-1 py-1">
            <button className="text-gray-900 hover:bg-indigo-500 hover:text-white group flex w-full items-center rounded-md px-2 py-2 text-sm">
              <HelpCircle className="mr-2 h-4 w-4" />
              Help
            </button>
          </div>
          <div className="px-1 py-1">
            <button className="text-gray-900 hover:bg-indigo-500 hover:text-white group flex w-full items-center rounded-md px-2 py-2 text-sm">
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
