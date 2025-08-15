import React from "react";
import {
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
} from "@radix-ui/react-icons";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import Link from "next/link";
import { Plus } from "lucide-react";

const backgrounds = [
  "from-purple-200/40 to-pink-200/40",
  "from-blue-200/40 to-cyan-200/40",
  "from-green-200/40 to-emerald-200/40",
  "from-yellow-200/40 to-orange-200/40",
  "from-red-200/40 to-pink-200/40",
];

const sizeMap = {
  rectWide: "lg:col-span-2 lg:row-span-1",
  rectTall: "lg:col-span-1 lg:row-span-2",
  square: "lg:col-span-1 lg:row-span-1",
};

const mockData = [
  {
    Icon: FileTextIcon,
    name: "Save your files",
    description: "We automatically save your files as you type.",
    href: "/",
  },
  {
    Icon: InputIcon,
    name: "Full text search",
    description: "Search through all your files in one place.",
    href: "/",
  },
  {
    Icon: GlobeIcon,
    name: "Multilingual",
    description: "Supports 100+ languages and counting.",
    href: "/",
  },
  {
    Icon: CalendarIcon,
    name: "Calendar",
    description: "Use the calendar to filter your files by date.",
    href: "/",
  },
  {
    Icon: BellIcon,
    name: "Notifications",
    description: "Get notified when someone shares a file or mentions you.",
    href: "/",
  },
];

function Cards() {
  // Later: replace with DB query
  const features = mockData.map((item) => {
    const randomBg =
      backgrounds[Math.floor(Math.random() * backgrounds.length)];
    return {
      ...item,
      cta: "Learn More",
      background: (
        <div
          className={`absolute inset-0 bg-gradient-to-tr ${randomBg} rounded-2xl`}
        />
      ),
      className: sizeMap.rectTall,
    };
  });

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      {/* Header with Add Button */}
      <div className="w-full max-w-5xl flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Your Cards</h2>
        <Link
          href="/add-card"
          className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition"
        >
          <Plus className="w-4 h-4" />
          Add New Card
        </Link>
      </div>

      {/* Cards Grid */}
      <div className="max-w-5xl w-full">
        <BentoGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[150px]">
          {features.map((feature) => (
            <BentoCard
              key={feature.name}
              {...feature}
              className={`bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${feature.className}`}
            />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
}

export default Cards;
