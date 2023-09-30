import { createServerSupabaseClient } from "../../../supabase/supabase-server";

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  if (request.method !== "GET") {
    return new Response("Method Not Allowed")
  }
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase.auth.getUser();

  if (error)  {
    console.log(error);
    return new Response("Internal Server Error.");
  }

  return new Response(JSON.stringify({ result : data.user}));
}