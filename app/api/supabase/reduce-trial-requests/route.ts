import { createServerSupabaseClient } from "../../../supabase/supabase-server";

export const dynamic = "force-dynamic"

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

    const userId = session.data.session!.user.id

    const { data, error } = await supabase
    .from('users')
    .select()
    .eq('id', userId)
    if (error) {
      return new Response(error.message);
    }
    const trialRequestsLeft = data[0].trial_requests
    const reducedTrialRequests = trialRequestsLeft - 1
    await supabase
    .from('users')
    .update({trial_requests: reducedTrialRequests})
    .eq('id', userId)
    return new Response("Success");
  } catch {
    return new Response("Internal Server Error.");
  }
}