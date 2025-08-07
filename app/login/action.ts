// "use server";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
// import { createClient } from "@/utils/supabase/server";

// export async function login(formData: FormData) {
//   const supabase = await createClient();
//   const email = formData.get("email") as string;
//   const password = formData.get("password") as string;

//   const { error } = await supabase.auth.signInWithPassword({
//     email,
//     password,
//   });

//   if (error) {
//     console.error("Login error:", error.message);
//     redirect("/login?message=" + encodeURIComponent(error.message));
//   }

//   revalidatePath("/", "layout");
//   redirect("/dashboard");
// }

// export async function signup(formData: FormData) {
//   const supabase = await createClient();
//   const name = formData.get("name") as string;
//   const email = formData.get("email") as string;
//   const password = formData.get("password") as string;

//   const { error } = await supabase.auth.signUp({
//     email,
//     password,
//     // options: {
//     //   emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm`,
//     // },
//   });

//   if (error) {
//     console.error("Signup error:", error.message);
//     redirect("/login?message=" + encodeURIComponent(error.message));
//   }

//   revalidatePath("/", "layout");
//   redirect(
//     "/login?message=" +
//       encodeURIComponent("Check your email to confirm your account.")
//   );
// }

// export async function signInWithGoogle() {
//   const supabase = await createClient();
//   const { data, error } = await supabase.auth.signInWithOAuth({
//     provider: "google",
//     options: {
//       redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
//     },
//   });

//   if (error) {
//     console.error("Google sign-in error:", error.message);
//     redirect("/login?message=" + encodeURIComponent(error.message));
//   }

//   if (data.url) {
//     redirect(data.url); // Redirect to Google's OAuth consent screen
//   }
// }
