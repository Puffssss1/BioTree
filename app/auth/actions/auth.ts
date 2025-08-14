"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { type EmailOtpType } from "@supabase/supabase-js";

export async function getUserSession() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error) {
    return null;
  }
  return { status: "sucess", user: data?.user, error: error };
}

// export async function getUserById(formData: FormData) {
//   const supabase = await createClient();
//   const email = formData.get("email") as string;

//   // const { data: exisingUser } = await supabase
//   //   .from("users")
//   //   .select("*")
//   //   .eq("email", email)
//   //   .single();

//   const { data: exisingUser } = await supabase.auth.admin.listUsers();

//   if (!exisingUser) {
//     return { status: "no user", user: exisingUser };
//   }

//   return { status: "user exist", user: exisingUser.users };
// }

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
      emailRedirectTo: "/",
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

export async function signinWithGoogle() {
  const origin = (await headers()).get("origin");
  const supabase = await createClient();

  const auth_callback_url = `${origin}/auth/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: auth_callback_url,
    },
  });

  console.log(data);

  if (error) {
    console.log(error);
    redirect("/error");
  } else if (data.url) {
    return redirect(data.url);
  }
}

async function addUser(email: string, name: string) {
  const supabase = await createClient();
  const { data: exisingUser } = await supabase
    .from("user_profile")
    .select("*")
    .eq("email", email)
    .single();

  if (!exisingUser) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { error: insertError } = await supabase.from("user_profile").insert({
      email: email,
      name: name,
    });
  }
}

export async function verifyEmail(
  token_hash: string,
  type: EmailOtpType,
  email: string,
  name: string
) {
  if (token_hash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      addUser(email, name);
      console.log(error);
      redirect("/login");
    }

    redirect("/error");
  }
}
