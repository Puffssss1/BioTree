// === StepTwo.tsx ===
import React, { useState } from "react";
import {
  Instagram,
  Twitter,
  Linkedin,
  Github,
  Mail,
  Globe,
  Youtube,
  Facebook,
  Twitch,
  BookText as TikTok,
  Trash2,
  Plus,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface Link {
  id: string;
  title: string;
  url: string;
  icon: string;
  color: string;
}

interface StepTwoProps {
  links: Link[];
  handleLinkChange: (id: string, field: string, value: string) => void;
  addLink: () => void;
  removeLink: (id: string) => void;
}

const iconOptions = [
  { name: "Globe", icon: Globe },
  { name: "Instagram", icon: Instagram },
  { name: "Twitter", icon: Twitter },
  { name: "Linkedin", icon: Linkedin },
  { name: "Github", icon: Github },
  { name: "Youtube", icon: Youtube },
  { name: "Mail", icon: Mail },
  { name: "Facebook", icon: Facebook },
  { name: "Twitch", icon: Twitch },
  { name: "TikTok", icon: TikTok },
];

const colorOptions = [
  "from-blue-500 to-purple-600",
  "from-pink-500 to-orange-500",
  "from-blue-400 to-blue-600",
  "from-green-500 to-emerald-600",
  "from-red-500 to-red-700",
  "from-yellow-400 to-orange-500",
  "from-purple-500 to-pink-500",
  "from-indigo-500 to-purple-600",
  "from-teal-400 to-blue-500",
  "from-gray-700 to-gray-900",
];

export default function StepTwo({
  links,
  handleLinkChange,
  addLink,
  removeLink,
}: StepTwoProps) {
  const [openLinkId, setOpenLinkId] = useState<string | null>(null);

  const toggleAdvanced = (id: string) => {
    setOpenLinkId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6 bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
      <h2 className="text-xl font-semibold text-gray-800">Your Links</h2>

      {links.map((link, index) => {
        const IconComponent =
          iconOptions.find((icon) => icon.name === link.icon)?.icon || Globe;
        const isOpen = openLinkId === link.id;

        return (
          <div
            key={link.id}
            className="space-y-4 border p-4 rounded-xl bg-white shadow"
          >
            {/* Top Bar */}
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-700">Link {index + 1}</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleAdvanced(link.id)}
                  className="text-gray-600 text-sm flex items-center gap-1 hover:text-purple-600"
                >
                  {isOpen ? (
                    <>
                      <ChevronUp className="w-4 h-4" />
                      Hide options
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" />
                      Advanced options
                    </>
                  )}
                </button>
                {links.length > 1 && (
                  <button
                    onClick={() => removeLink(link.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Basic Fields */}
            <input
              type="text"
              value={link.title}
              onChange={(e) =>
                handleLinkChange(link.id, "title", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Link Title"
            />
            <input
              type="url"
              value={link.url}
              onChange={(e) => handleLinkChange(link.id, "url", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="https://example.com"
            />

            {/* Preview (Always visible) */}
            <div>
              <p className="text-sm font-medium mb-2">Live Preview</p>
              <div
                className={`flex items-center space-x-3 p-3 bg-gradient-to-r ${link.color} text-white rounded-lg`}
              >
                <div className="w-8 h-8 bg-white/30 rounded flex items-center justify-center">
                  <IconComponent className="w-4 h-4" />
                </div>
                <span>{link.title || "Your Link"}</span>
              </div>
            </div>

            {/* Advanced Options (Collapsible) */}
            {isOpen && (
              <div className="space-y-4 pt-4">
                <div>
                  <p className="text-sm font-medium mb-2">Choose Icon</p>
                  <div className="grid grid-cols-5 gap-2">
                    {iconOptions.map(({ name, icon: Icon }) => (
                      <button
                        key={name}
                        onClick={() => handleLinkChange(link.id, "icon", name)}
                        className={`p-2 border rounded-lg ${
                          link.icon === name
                            ? "border-purple-500 bg-purple-100"
                            : "border-gray-300"
                        }`}
                      >
                        <Icon className="w-5 h-5 mx-auto text-gray-700" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Choose Color</p>
                  <div className="grid grid-cols-5 gap-2">
                    {colorOptions.map((color) => (
                      <button
                        key={color}
                        onClick={() =>
                          handleLinkChange(link.id, "color", color)
                        }
                        className={`w-8 h-8 rounded-lg bg-gradient-to-r ${color} ${
                          link.color === color
                            ? "border-2 border-gray-800 scale-110"
                            : "border border-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Add Link Button */}
      <div className="flex justify-end pt-2">
        <button
          onClick={addLink}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Link
        </button>
      </div>
    </div>
  );
}
