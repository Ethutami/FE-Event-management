// components/dashboard/Header.tsx
import { Bell } from "lucide-react";
import Dropdown from "./component/dropdown";

export default function Header() {
  return (
    <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Organizer Dashboard
        </h2>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button
            className="p-2 rounded-full hover:bg-gray-100 relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <Dropdown/>
        </div>
      </div>
    </header>
  );
}
