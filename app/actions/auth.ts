"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
// import { headers } from "next/headers";

export async function getUserSession() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error) {
    return null;
  }
  return { status: "sucess", user: data?.user };
}

export async function signUp(formData: FormData) {
  const supabase = await createClient();

  const credentials = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error, data } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
    options: {
      data: {
        firstName: credentials.firstName,
        lastName: credentials.lastName,
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

  const fullname = credentials.firstName + " " + credentials.lastName;

  const { error: insertError } = await supabase.from("user_profile").insert({
    email: credentials.email,
    name: fullname,
  });

  if (insertError) {
    return {
      status: insertError.message,
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
