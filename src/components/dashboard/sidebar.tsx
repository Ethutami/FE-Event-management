import Link from "next/link";
import { User, Calendar, BarChart, CreditCard } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-64 bg-[#112D4E] text-white p-4">
      <h1 className="text-2xl font-bold mb-8">Event Dashboard</h1>
      <nav>
        <ul className="space-y-2">
          {[
            { href: "/dashboard/profile", icon: User, label: "Profile" },
            { href: "/dashboard/events", icon: Calendar, label: "Events" },
            {
              href: "/dashboard/transactions",
              icon: CreditCard,
              label: "Transactions",
            },
            {
              href: "/dashboard",
              icon: BarChart,
              label: "Statistics",
            },
          ].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center py-2 px-4 rounded hover:bg-indigo-600"
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
