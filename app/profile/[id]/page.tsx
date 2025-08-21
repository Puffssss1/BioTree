import * as LucideIcons from "lucide-react";
import { Globe, LucideIcon } from "lucide-react";

interface ProfilePageProps {
  params: Promise<{ id: string }>;
}

interface CardLink {
  id: string;
  url: string;
  link_title: string;
  link_color: string;
  link_icon: string;
}

interface Card {
  id: string;
  name: string;
  bio_title: string;
  about: string;
  location: string;
  image_url?: string;
  links?: CardLink[];
}

// Map DB icon names to Lucide icons
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

const ProfileAvatar = ({
  name,
  image_url,
}: {
  name: string;
  image_url?: string;
}) => (
  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center overflow-hidden">
    {image_url ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image_url}
        alt="Avatar"
        className="w-full h-full object-cover"
      />
    ) : (
      <span className="text-white text-2xl font-bold">
        {name
          ?.split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase() || "U"}
      </span>
    )}
  </div>
);

const ProfileInfo = ({ card }: { card: Card }) => (
  <div>
    <h1 className="text-lg font-semibold">{card.bio_title}</h1>
    <h3 className="text-lg">{card.name}</h3>
    <p className="text-gray-600 text-sm">{card.about}</p>
    <p className="text-gray-500 text-sm">📍 {card.location}</p>
  </div>
);

const LinksList = ({ links }: { links?: CardLink[] }) => (
  <div className="space-y-4">
    <h2 className="text-xl font-semibold text-gray-800 flex items-center">
      <Globe className="w-5 h-5 mr-2" />
      Your Links
    </h2>
    {links?.map((link) => {
      const Icon = iconComponents[link.link_icon] || Globe; // fallback to Globe
      return (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r ${link.link_color} text-white shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300`}
        >
          <div className="w-10 h-10 bg-white/30 rounded-lg flex items-center justify-center">
            <Icon className="w-5 h-5" />
          </div>
          <span className="font-medium">{link.link_title}</span>
        </a>
      );
    })}
  </div>
);

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/cards/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return <div className="p-4 text-red-500">Card not found</div>;
  }

  const card: Card = await res.json();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
      <p className="text-gray-500 mb-6">Showing card with ID: {id}</p>

      <div className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-2xl rounded-2xl p-8 space-y-8">
        <div className="flex items-center space-x-6">
          <ProfileAvatar name={card.name} image_url={card.image_url} />
          <ProfileInfo card={card} />
        </div>

        <LinksList links={card.links} />
      </div>
    </div>
  );
}
