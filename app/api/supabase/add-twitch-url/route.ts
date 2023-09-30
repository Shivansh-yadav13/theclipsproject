import { createServerSupabaseClient } from "../../../supabase/supabase-server";

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed")
  }
  const reqdata = await request.json();
  const { twitch_url } = reqdata;
  try {
    const supabase = createServerSupabaseClient()
    const { error } = await supabase
    .from('twitch_urls')
    .insert({ url: twitch_url })
    if (error) {
      return new Response(error.message);
    }
    return new Response("Success");
  } catch {
    return new Response("Internal Server Error.");
  }
}