import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import * as argon2 from "argon2";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("users")
    .select("created_at, id, email, name");
  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    // Check if email already exists
    const { data: userExist } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (userExist) {
      return NextResponse.json(
        { error: "Email already registered." },
        { status: 409 }
      );
    }

    const hashed = await argon2.hash(password);

    const newUser = {
      id: uuidv4(),
      name,
      email,
      password: hashed,
    };
    const { error } = await supabase.from("users").insert([newUser]);
    if (error) {
      console.log(error);
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json({ message: "sign up success!" }, { status: 200 });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
