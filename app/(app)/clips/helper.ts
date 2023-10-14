import axios from "axios";

export const getClipsData = async () => {
  async function wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  let clipsData, user_busy_status;

  do {
    clipsData = await axios.get(`/api/fusionclipsai/kick`);
    user_busy_status = clipsData.data.status;

    if (user_busy_status) {
      console.log("Waiting for the process to complete...");
      await wait(35000);
    }
  } while (user_busy_status);

  return clipsData;
};

export const increaseTotalRequests = async (supabase: any) => {
  try {
    const user = await getUserData(supabase);
    const totalUserRequests = user.total_requests
    const increasedUserRequests = totalUserRequests + 1

    await supabase
      .from('users')
      .update({ total_requests: increasedUserRequests })
      .eq('id', user.id)

  } catch (error) {
    console.log(error)
  }
}

export const storeUrl = async (url: string) => {
  try {
    const formData = new FormData();
    formData.append("twitch_url", url);
    await axios.post('/api/supabase/add-twitch-url', formData, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.log(error)
  }
}

export const getUserData = async (supabase: any) => {
  try {
    const { data, error } = await supabase.auth.getUser()
    const userId = data.user.id;
    if (userId) {
      const userData = await supabase.from("users").select().eq("id", userId)
      return userData.data[0]
    }
  } catch (e) {
    console.log(e)
    return null;
  }
}

export const getUserSubscription = async (supabase: any) => {
  try {
    const user = await getUserData(supabase);
    const { data, error } = await supabase
      .from('subscriptions')
      .select()
      .eq('user_id', user.id)
    if (error) {
      console.log(error)
      return null
    }
    if (data?.length == 0) {
      return null
    }
    return data[0]
  } catch (e) {
    console.log(e)
    return null;
  }
}

export const getLastRequestData = async (supabase: any) => {
  try {
    const user = await getUserData(supabase)
    const { data, error } = await supabase
      .from("users")
      .select('last_request_data')
      .eq('id', user.id)
    console.log(data[0].last_request_data)
    return data[0].last_request_data;
  } catch (error) {
    console.log(error)
    return null
  }
}


export const getServerBusyStatus = async (supabase: any) => {
  try {
    const user = await getUserData(supabase);
    const { data, error } = await supabase
      .from('users')
      .select('server_busy_status')
      .eq('id', user.id)
    return data[0].server_busy_status
  } catch (error) {
    console.log(error)
  }
}
