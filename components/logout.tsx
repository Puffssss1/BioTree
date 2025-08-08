"use client";
import React, { useEffect, useState } from "react";
// import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
// import { createClient } from "@/utils/supabase/server";
import { creatClientCSR } from "@/utils/supabase/client";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "@/app/actions/auth";
import { toast } from "sonner";

function Logout() {
  const [userName, setUserName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  // const [user, setUser] = useState<string>('');

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = creatClientCSR();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserName(user?.email || "");
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  // useEffect(() => {
  //   async function getUser() {
  //     const supabase = await createClient();
  //     const { data, error } = await supabase.auth.getUser();

  //     if (error || !data?.user) {
  //       console.log('no user is login')
  //     } else {
  //       setUser(data?.user)
  //     }
  //   }
  //   getUser()
  // }, [])

  const handleLogOut = async () => {
    await signOut();
    toast.message("Successfully Logged out", {
      description: "Thanks for using BioTree",
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              {/* <LogOut className="w-4 h-4" /> */}
            </>
          ) : (
            <div className="flex items-center gap-x-4 text-sm">
              <span className="hidden sm:inline">{userName}</span>
              <LogOut className="w-4 h-4" />
            </div>
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You are Signing Out to your account. Click confirm if you&apos;re
            sure.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogOut}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Logout;
