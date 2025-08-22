"use client";
import React, { useEffect, useState } from "react";
import { Loader2, Share2 } from "lucide-react";
import {
  // BellIcon,
  // CalendarIcon,
  // FileTextIcon,
  GlobeIcon,
  // InputIcon,
} from "@radix-ui/react-icons";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import Link from "next/link";
import { Plus } from "lucide-react";
import { creatClientCSR } from "@/utils/supabase/client";

interface BioCard {
  id: string;
  user_id: string;
  image_url: string;
  name: string;
  about: string;
  location: string;
  bio_title: string;
  title: string;
}

interface Feature {
  Icon: React.ElementType;
  name: string;
  description: string;
  href: string;
  cta: string;
  background: React.ReactNode;
  className: string;
}

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

// 🔹 Share Button Component
function ShareButton({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = `${process.env.NEXT_PUBLIC_SITE_URL}/profile/${id}`;

    try {
      // Use Web Share API if available (mobile)
      if (navigator.share) {
        await navigator.share({
          title: "Check out this profile",
          url,
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-gray-700 shadow transition"
    >
      <Share2 className="w-4 h-4" />
      {copied && (
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs bg-black text-white px-2 py-1 rounded">
          Copied!
        </span>
      )}
    </button>
  );
}

function Cards() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = creatClientCSR();

        const { data: userData } = await supabase.auth.getUser();
        const userId = userData?.user?.id;

        // Fetch all cards
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/save-card`,
          {
            cache: "no-store",
          }
        );
        const allCards: BioCard[] = await res.json();

        // Filter by userId
        const data = allCards.filter((card) => card.user_id === userId);

        // Map into features
        const mapped = data.map((item) => {
          const randomBg =
            backgrounds[Math.floor(Math.random() * backgrounds.length)];

          return {
            Icon: GlobeIcon,
            name: `${item.bio_title} | ${item.name}`,
            description: item.about ?? "No description available",
            href: `/profile/${item.id}`,
            cta: "Learn More",
            background: (
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                {item.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image_url}
                    alt="Bio Card"
                    className="w-full h-full object-cover [--duration:20s] [mask-image:linear-gradient(to_top,transparent_20%,#000_70%)]"
                  />
                ) : (
                  <div
                    className={`w-full h-full bg-gradient-to-tr ${randomBg}`}
                  />
                )}
                {/* Share button inside each card */}
                <ShareButton id={item.id} />
              </div>
            ),
            className: sizeMap.rectTall,
          };
        });

        setFeatures(mapped);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-gray-500" />
      </div>
    );

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
        <BentoGrid
          className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-3 
            gap-6 
            auto-rows-[300px]       /* default (mobile) */
            sm:auto-rows-[300px]    /* tablets */
            lg:auto-rows-[150px]    /* desktop */
          "
        >
          {features.map((feature, i) => (
            <BentoCard
              key={i}
              {...feature}
              className={`bg-white/60 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${feature.className} `}
            />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
}

export default Cards;
