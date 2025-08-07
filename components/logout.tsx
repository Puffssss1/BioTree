// "use client";
// import React, { useEffect, useState } from "react";
// // import { useState } from "react";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { createClient } from "@/utils/supabase/server";
// import { Button } from "./ui/button";
// import { LogOut } from "lucide-react";
// import { signOut } from "@/app/actions/auth";
// import { toast } from "sonner";

// function Logout() {
//   const [userName, setUserName] = useState<string>("");

//   useEffect(() => {
//     const fetchUser = async () => {
//       const supabase = await createClient(); // no need for await
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();
//       setUserName(user?.email || "");
//     };

//     fetchUser();
//   }, []);

//   const handleLogOut = async () => {
//     await signOut();
//     // toast.message("Successfully Logged out", {
//     //   description: "Thanks for using BioTree",
//     // });
//   };

//   return (
//     <AlertDialog>
//       <AlertDialogTrigger asChild>
//         <Button
//           variant="destructive"
//           className="hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//         >
//           <div className="flex items-center gap-x-4 text-sm">
//             {userName} <LogOut className="w-4 h-4" />
//           </div>
//         </Button>
//       </AlertDialogTrigger>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//           <AlertDialogDescription>
//             You are Signing Out to your account. Click confirm if you&apos;re
//             sure.
//           </AlertDialogDescription>
//         </AlertDialogHeader>
//         <AlertDialogFooter>
//           <AlertDialogCancel>Cancel</AlertDialogCancel>
//           <AlertDialogAction onClick={handleLogOut}>Continue</AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// }

// export default Logout;
