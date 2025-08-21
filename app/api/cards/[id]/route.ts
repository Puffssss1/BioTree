import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const supabase = await createClient();
  try {
    const { data: cards, error: cardError } = await supabase
      .from("bio_card")
      .select("*")
      .eq("id", id)
      .single();

    if (cardError) {
      return NextResponse.json({ message: cardError.message }, { status: 404 });
    }
    if (!cards) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const { data: links, error: linksError } = await supabase
      .from("bio_links")
      .select("*")
      .eq("bio_card_id", cards.id);
    if (linksError) {
      return NextResponse.json(
        { message: linksError.message },
        { status: 404 }
      );
    }

    // Combine card and links in a single object
    const responsePayload = { ...cards, links };

    return NextResponse.json(responsePayload);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" + error },
      { status: 500 }
    );
  }
}
