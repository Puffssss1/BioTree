// === StepTwo.tsx ===
import React from "react";
import { Plus, Trash2, Globe } from "lucide-react";

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

export default function StepTwo({
  links,
  handleLinkChange,
  addLink,
  removeLink,
}: StepTwoProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-2xl rounded-2xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <Globe className="w-5 h-5 mr-2" />
          Your Links
        </h2>
        <button
          onClick={addLink}
          className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl px-4 py-2 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
          <span>Add Link</span>
        </button>
      </div>

      <div className="space-y-4">
        {links.map((link, index) => (
          <div key={link.id} className="bg-gray-50 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">
                Link {index + 1}
              </span>
              {links.length > 1 && (
                <button
                  onClick={() => removeLink(link.id)}
                  className="text-red-500 hover:text-red-700 p-2"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={link.title}
                  onChange={(e) =>
                    handleLinkChange(link.id, "title", e.target.value)
                  }
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  placeholder="Link title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL
                </label>
                <input
                  type="url"
                  value={link.url}
                  onChange={(e) =>
                    handleLinkChange(link.id, "url", e.target.value)
                  }
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  placeholder="https://example.com"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
