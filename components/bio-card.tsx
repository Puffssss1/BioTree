"use client";
import React, { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import * as LucideIcons from "lucide-react";
import { Save } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { toast } from "sonner";

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

  const iconComponents: Record<string, LucideIcon> = {
    Globe: LucideIcons.Globe,
    Instagram: LucideIcons.Instagram,
    Twitter: LucideIcons.Twitter,
    Linkedin: LucideIcons.Linkedin,
    Github: LucideIcons.Github,
    Youtube: LucideIcons.Youtube,
    Mail: LucideIcons.Mail,
    Facebook: LucideIcons.Facebook,
    Twitch: LucideIcons.Twitch,
    TikTok: LucideIcons.Music,
  };

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
          iconComponents={iconComponents}
        />
      )}

      <div className="flex justify-between pt-4">
        {step > 1 && (
          <button
            onClick={() => setStep((prev) => prev - 1)}
            className="px-4 py-2 bg-gray-300 rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Back
          </button>
        )}
        {step < 3 ? (
          <button
            onClick={() => setStep((prev) => prev + 1)}
            className="ml-auto px-4 py-2 bg-purple-500 text-white rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Next
          </button>
        ) : (
          <button
            className="ml-auto flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            onClick={() =>
              toast.success(
                "You have Created your BioTree, share the link to your link to anyone!"
              )
            }
          >
            <Save className="w-4 h-4" /> <span>Finish</span>
          </button>
        )}
      </div>
    </div>
  );
}
