"use client";
import React, { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import * as LucideIcons from "lucide-react";
import { Save } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconOptions = [
  { name: "Globe", color: "from-blue-500 to-purple-600" },
  { name: "Instagram", color: "from-pink-500 to-orange-500" },
  { name: "Twitter", color: "from-blue-400 to-blue-600" },
  { name: "Linkedin", color: "from-blue-600 to-blue-800" },
  { name: "Github", color: "from-gray-700 to-gray-900" },
  { name: "Youtube", color: "from-red-500 to-red-700" },
  { name: "Mail", color: "from-green-500 to-emerald-600" },
  { name: "Facebook", color: "from-blue-600 to-blue-800" },
  { name: "Twitch", color: "from-purple-500 to-purple-700" },
  { name: "TikTok", color: "from-gray-800 to-black" },
];

export default function BioCard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    location: "",
    avatar: "",
  });

  const [links, setLinks] = useState([
    {
      id: "1",
      title: "",
      url: "",
      icon: "Globe",
      color: "from-blue-500 to-purple-600",
    },
  ]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLinkChange = (id: string, field: string, value: string) => {
    setLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, [field]: value } : link))
    );
  };

  const addLink = () => {
    const newLink = {
      id: Date.now().toString(),
      title: "",
      url: "",
      icon: "Globe",
      color: "from-blue-500 to-purple-600",
    };
    setLinks((prev) => [...prev, newLink]);
  };

  const removeLink = (id: string) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  };

  const getIconComponent = (iconName: string): LucideIcon => {
    const icon = LucideIcons[iconName as keyof typeof LucideIcons];
    return typeof icon === "function"
      ? (icon as LucideIcon)
      : LucideIcons.Globe;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {step === 1 && (
        <StepOne formData={formData} handleInputChange={handleInputChange} />
      )}
      {step === 2 && (
        <StepTwo
          links={links}
          handleLinkChange={handleLinkChange}
          addLink={addLink}
          removeLink={removeLink}
        />
      )}
      {step === 3 && (
        <StepThree
          formData={formData}
          links={links}
          getIconComponent={getIconComponent}
        />
      )}

      <div className="flex justify-between pt-4">
        {step > 1 && (
          <button
            onClick={() => setStep((prev) => prev - 1)}
            className="px-4 py-2 bg-gray-300 rounded-xl"
          >
            Back
          </button>
        )}
        {step < 3 ? (
          <button
            onClick={() => setStep((prev) => prev + 1)}
            className="ml-auto px-4 py-2 bg-purple-500 text-white rounded-xl"
          >
            Next
          </button>
        ) : (
          <button
            className="ml-auto flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-xl"
            onClick={() => alert("Saved successfully!")}
          >
            <Save className="w-4 h-4" /> <span>Finish</span>
          </button>
        )}
      </div>
    </div>
  );
}
