import { createServerSupabaseClient } from "../../../supabase/supabase-server";

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed")
  }
  try {
    const reqdata = await request.json();
    const { updateData } = reqdata;
    const supabase = createServerSupabaseClient()
    const session = await supabase.auth.getSession()
    if (session.error) {
      return new Response("Error in Session");
    }
    const userId = session.data.session?.user.id;
    const { error } = await supabase
    .from('users')
    .update({ request_status: updateData })
    .eq('id', userId!)

    if (error) {
      return new Response(error.message);
    }

    return new Response("Success")
  } catch {
    return new Response("Internal Server Error.");
  }
}

export async function GET(request: Request) {
  if (request.method !== "GET") {
    return new Response("Method Not Allowed")
  }
  try {
    const supabase = createServerSupabaseClient()
    const session = await supabase.auth.getSession()
    if (session.error) {
      return new Response("Error in Session");
    }
    const userId = session.data.session?.user.id;
    const { data, error } = await supabase
    .from('users')
    .select()
    .eq('id', userId!)

    if (error) {
      return new Response(error.message);
    }

    return new Response(JSON.stringify({ result: data[0].request_status}))
  } catch {
    return new Response("Internal Server Error.");
  }
}