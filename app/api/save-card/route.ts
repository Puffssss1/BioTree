import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

// Optional: define TypeScript types for better safety
interface LinkPayload {
  title: string;
  url: string;
  icon: string;
  color: string;
}

interface CardPayload {
  user_id: string;
  name: string;
  location: string;
  about: string;
  image_url?: string;
  bio_title: string;
  title?: string;
  links?: LinkPayload[];
}

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
  const body: CardPayload = await req.json();

  try {
    // 1️⃣ Insert the main card
    const { data: card, error: cardError } = await supabase
      .from("bio_card")
      .insert({
        user_id: body.user_id,
        name: body.name,
        location: body.location,
        about: body.about,
        image_url: body.image_url,
        bio_title: body.bio_title,
        title: body.title,
      })
      .select()
      .single(); // returns the inserted card with its generated id

    if (cardError || !card) {
      return NextResponse.json(
        { message: cardError?.message || "Failed to create card" },
        { status: 400 }
      );
    }

    // 2️⃣ Insert links if provided
    let linksData: LinkPayload[] = [];
    if (body.links && body.links.length > 0) {
      const linksToInsert = body.links.map((link) => ({
        bio_card_id: card.id,
        link_title: link.title,
        url: link.url,
        link_icon: link.icon,
        link_color: link.color,
      }));

      const { data: insertedLinks, error: linksError } = await supabase
        .from("bio_links")
        .insert(linksToInsert);

      if (linksError) {
        return NextResponse.json(
          { message: linksError.message },
          { status: 400 }
        );
      }

      linksData = insertedLinks ?? [];
    }

    // 3️⃣ Return the card + links as a single JSON object
    return NextResponse.json({ ...card, links: linksData });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
