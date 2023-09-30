import { createServerSupabaseClient } from "../../../supabase/supabase-server";

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed")
  }
  const reqdata = await request.json();
  const { email, twitch_url, message } = reqdata;
  console.log(email, twitch_url, message);
  try {
    const supabase = createServerSupabaseClient()
    const { error } = await supabase
    .from('reports')
    .insert({ email: email, twitch_url: twitch_url, message: message })
    if (error) {
      return new Response(error.message);
    }
    return new Response("Success");
  } catch {
    return new Response("Internal Server Error.");
  }
}