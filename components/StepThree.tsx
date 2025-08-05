// === StepThree.tsx ===
import React from "react";
import { User as UserIcon, Globe } from "lucide-react";

interface Link {
  id: string;
  title: string;
  url: string;
  icon: string;
  color: string;
}

interface StepThreeProps {
  formData: {
    name: string;
    bio: string;
    location: string;
    avatar: string;
  };
  links: Link[];
  iconComponents: Record<string, React.ElementType>;
}

export default function StepThree({
  formData,
  links,
  iconComponents,
}: StepThreeProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-2xl rounded-2xl p-8 space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <UserIcon className="w-5 h-5 mr-2" />
          Profile Preview
        </h2>
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center overflow-hidden">
            {formData.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={formData.avatar}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white text-xl font-bold">
                {formData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase() || "U"}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold">{formData.name}</h3>
            <p className="text-gray-600 text-sm">{formData.bio}</p>
            <p className="text-gray-500 text-sm">📍 {formData.location}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <Globe className="w-5 h-5 mr-2" />
          Your Links
        </h2>
        {links.map((link) => {
          const Icon = iconComponents[link.icon] || Globe;
          return (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r ${link.color} text-white shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
            >
              <div className="w-10 h-10 bg-white/30 rounded-lg flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              <span className="font-medium">{link.title}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
