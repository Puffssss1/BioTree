import React from "react";
import Logout from "@/components/logout";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link"; // Correct import for routing
import { LogIn } from "lucide-react";

async function NavBar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full z-20">
        <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Customize Your Profile
            </h1>
            <p className="text-gray-600 mt-1">
              Create your personalized link tree
            </p>
          </div>
          {!user ? (
            <Link
              href="/login"
              className="flex items-center gap-2 text-blue-600 hover:underline"
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </Link>
          ) : (
            <Logout />
          )}
        </div>
      </header>
    </>
  );
}

export default NavBar;
