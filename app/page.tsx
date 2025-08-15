import BioCard from "@/components/bio-card";
import Cards from "@/components/cards";
import Logout from "@/components/logout";
import { createClient } from "@/utils/supabase/server";
import { Link, LogIn } from "lucide-react";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="relative z-10 max-w-full mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Customize Your Profile
            </h1>
            <p className="text-gray-600 mt-1">
              Create your personalized link tree
            </p>
          </div>
          {/* log out */}
          {!user ? (
            <Link href="/login">
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </Link>
          ) : (
            <>
              <Logout />
            </>
          )}
        </div>

        {/* List of Bio */}
        <BioCard />
        <Cards />
      </div>
    </div>
  );
}
