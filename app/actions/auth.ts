"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
// import { headers } from "next/headers";

export async function signUp(formData: FormData) {
  const supabase = await createClient();

  const credentials = {
    username: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error, data } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
    options: {
      data: {
        username: credentials.username,
      },
    },
  });

  if (error) {
    console.error("Signup error:", error.message);
    return {
      status: error?.message,
      user: null,
    };
  } else if (data?.user?.identities?.length === 0) {
    return {
      status: "",
      user: null,
    };
  }

  revalidatePath("/", "layout");
  return { status: "success", user: data.user };
}

export async function signIn(formData: FormData) {
  const supabase = await createClient();

  const credentials = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error, data } = await supabase.auth.signInWithPassword(credentials);

  if (error) {
    console.error("Sign in error: ", error.message);
    return {
      status: error?.message,
      user: null,
    };
  }

  revalidatePath("/", "layout");
  return { status: "success", user: data.user };
}

export async function signOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/login");
}
