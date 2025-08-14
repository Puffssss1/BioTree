// import { supabase } from "@/lib/supabase";
// import { NextResponse } from "next/server";

// export async function GET() {
//   const { data, error } = await supabase
//     .from("user_profile")
//     .select("id, email, name");
//   if (error) {
//     return NextResponse.json({ message: error.message }, { status: 400 });
//   }
//   return NextResponse.json(data);
// }

// export async function POST(req: Request) {
//   const body = await req.json();
//   const { name, email, password } = body;

//   const data = {
//     name: name,
//     email: email,
//     password: password,
//   };

//   const { error } = await supabase.auth.signUp(data);
//   const user = await supabase.from("user_profile").insert({
//     email: data.email,
//     name: data.name,
//   });

//   // if(insertError) {
//   //   return {
//   //     status: insertError.message
//   //   }
//   // }
//   console.log(user);

//   // const { error } = await supabase.auth.signInWithPassword(data);

//   if (error) {
//     console.log(error);
//     return NextResponse.json({ message: error.message });
//   }

//   return NextResponse.json({ message: "login success" });
// }
