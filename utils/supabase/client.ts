import { createBrowserClient } from "@supabase/ssr";

export function creatClientCSR() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE!,
    process.env.NEXT_PUBLIC_ANON_KEY!
  );
}
