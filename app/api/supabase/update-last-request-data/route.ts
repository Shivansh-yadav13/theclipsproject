import { createServerSupabaseClient } from "../../../supabase/supabase-server";

// export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed")
  }
  const reqdata = await request.json();
  const { url, timestamps } = reqdata;
  console.log(url, timestamps);
  try {
    const supabase = createServerSupabaseClient()
    const user = await supabase.auth.getUser()
    const { error } = await supabase
    .from('users')
    .update({ last_request_data: {
      'url': url,
      'timestamps': timestamps
    }})
    .eq('id', user.data.user!.id)
    if (error) {
      return new Response(error.message);
    }
    return new Response("Success");
  } catch {
    return new Response("Internal Server Error.");
  }
}