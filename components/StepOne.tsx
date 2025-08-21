"use client";
import React, { useEffect } from "react";
import { User, MapPin, Camera } from "lucide-react";
import { creatClientCSR } from "@/utils/supabase/client";

interface StepOneProps {
  formData: {
    name: string;
    card_title: string;
    bio: string;
    location: string;
    image_url: string;
  };
  handleInputChange: (field: string, value: string) => void;
}

export default function StepOne({ formData, handleInputChange }: StepOneProps) {
  useEffect(() => {
    async function getUser() {
      const supabase = await creatClientCSR();
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        console.log("no user logged in");
        return;
      }

      const defaultName =
        data.user.user_metadata?.firstName ||
        data.user.user_metadata?.full_name ||
        data.user.email?.split("@")[0] ||
        "User";

      // Only set if name is empty
      if (!formData.name) {
        handleInputChange("name", defaultName);
      }
    }
    getUser();
  }, [formData.name, handleInputChange]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const supabase = creatClientCSR();
    const filePath = `avatar/${Date.now()}-${file.name}`;

    // Upload the file
    const { error } = await supabase.storage
      .from("avatar")
      .upload(filePath, file);

    if (error) {
      console.error("Upload failed:", error.message);
      return;
    }

    // Get the public URL of the uploaded file
    const { data } = supabase.storage.from("avatar").getPublicUrl(filePath);

    if (!data?.publicUrl) {
      console.error("Failed to retrieve public URL");
      return;
    }

    // ✅ Save the public URL to formData
    handleInputChange("image_url", data.publicUrl);

    console.log("Uploaded avatar URL:", data.publicUrl);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-2xl rounded-2xl p-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
        <User className="w-5 h-5 mr-2" />
        Profile Information
      </h2>

      <div className="space-y-6">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
              {formData.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={formData.image_url}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white text-xl font-bold">
                  {formData.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase() || "U"}
                </span>
              )}
            </div>
            <label className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full shadow-lg p-0 border border-gray-200 hover:shadow-xl transition-all duration-300 flex items-center justify-center cursor-pointer">
              <Camera className="w-4 h-4 text-gray-600" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
            </label>
          </div>
          <div className="flex-1">
            <label className="text-sm text-gray-600 mb-2 block">
              Card Title
            </label>
            <input
              type="card_title"
              value={formData.card_title}
              onChange={(e) => handleInputChange("card_title", e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              placeholder="Enter title for this Bio Card"
            />
          </div>
        </div>

        {/* Display Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Display Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            placeholder="Your display name"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Bio
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => handleInputChange("bio", e.target.value)}
            rows={3}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            placeholder="Tell people about yourself..."
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              className="w-full pl-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              placeholder="Your location"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
