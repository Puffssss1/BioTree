"use client";
import React, { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import * as LucideIcons from "lucide-react";
import { Save } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { toast } from "sonner";
import { creatClientCSR } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export default function BioCard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    location: "",
    image_url: "",
    card_title: "",
  });

  const [links, setLinks] = useState([
    {
      id: "",
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

  const handleCLick = async () => {
    const supabase = creatClientCSR();
    const user = await supabase.auth.getUser();

    const payload = {
      user_id: user.data.user?.id,
      image_url: formData.image_url,
      name: formData.name,
      about: formData.bio,
      location: formData.location,
      bio_title: formData.card_title || "My Bio",
      links: links.map((link) => ({
        title: link.title,
        url: link.url,
        icon: link.icon,
        color: link.color,
      })),
    };

    const res = await fetch("api/save-card", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json();
      toast.error(err.message || "Error saving bio card");
      return;
    }

    toast.success(
      "You have Created your BioTree, share the link to your link to anyone 🎉"
    );

    redirect("/");
  };

  return (
    <section className="relative z-10 max-w-3xl mx-auto mt-34 px-4 space-y-8 ">
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

      {/* Step navigation */}
      <div className="flex justify-between pt-4">
        {step > 1 && (
          <button
            onClick={() => setStep((prev) => prev - 1)}
            className="px-4 py-2 bg-gray-200 rounded-xl hover:shadow-lg transition"
          >
            Back
          </button>
        )}
        {step < 3 ? (
          <button
            onClick={() => setStep((prev) => prev + 1)}
            className="ml-auto px-4 py-2 bg-purple-500 text-white rounded-xl hover:shadow-lg transition"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleCLick}
            className="ml-auto flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:shadow-lg transition"
          >
            <Save className="w-4 h-4" />
            Finish
          </button>
        )}
      </div>
    </section>
  );
}
