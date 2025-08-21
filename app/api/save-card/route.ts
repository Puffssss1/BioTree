import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("bio_card").select("*");
  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const supabase = await createClient();
  const body = await req.json();

  const { data, error } = await supabase.from("bio_card").insert({
    user_id: body.user_id,
    name: body.name,
    location: body.location,
    about: body.about,
    image_url: body.image_url,
    bio_title: body.bio_title,
    title: body.title,
  });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  console.log(body);
  return NextResponse.json(data);
}
