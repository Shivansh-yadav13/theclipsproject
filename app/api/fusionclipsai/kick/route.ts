import { createServerSupabaseClient } from "@/app/supabase/supabase-server";
import axios from "axios";

export async function POST(request: Request) {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed")
  }
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase.auth.getUser();
  const userId = data.user!.id

  const reqdata = await request.json();
  const { url, timestamps } = reqdata;
  try {
    const formData = new FormData();
    formData.append('kick_m3u8_url', url);
    formData.append('start_timestamps', JSON.stringify(timestamps))
    formData.append('user_id', userId)
    const result = await axios.post(`https://fusionclipsai.up.railway.app/analyze_kick_audio`, formData);
    // const result = await axios.post(`http://localhost:8080/analyze_kick_audio`, formData);
    return new Response(JSON.stringify({ result : true }));
  } catch (error) {
    console.log(error)
    return new Response("Internal Server Error.");
  }
}

export async function GET(request: Request) {
  if (request.method !== "GET") {
    return new Response("Method Not Allowed")
  }
  const supabase = createServerSupabaseClient();
  const user = await supabase.auth.getUser();
  const userId = user.data.user!.id;
  const {data, error} = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
  const server_busy_status = data![0].server_busy_status
  if (!server_busy_status) {
    if (data) {
      const lastReqData: any = data[0].last_request_data
      const clips = lastReqData.last_clips
      return new Response(JSON.stringify({"data": clips, "status": server_busy_status}))
    } else {
      return new Response(JSON.stringify({"data": null, "status": null}))
    }
  } else {
    return new Response(JSON.stringify({"data": null, "status": server_busy_status}))
  }
}