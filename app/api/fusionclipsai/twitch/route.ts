import axios from "axios";

export async function POST(request: Request) {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed")
  }
  const reqdata = await request.json();
  const { url, timestamps } = reqdata;
  try {
    const formData = new FormData();
    formData.append('twitch_url', url);
    formData.append('start_timestamps', JSON.stringify(timestamps))
    const result = await axios.post(`http://localhost:5000/analyze_twitch_audio`, formData);
    console.log(result.data)
    return new Response(JSON.stringify({ result : result.data }));
  } catch (error) {
    console.log(error)
    return new Response("Internal Server Error.");
  }
}