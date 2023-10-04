"use client"

import axios from "axios";
import Image from "next/image"
import { useSupabase } from '@/app/supabase/supabase-provider';
import { useEffect, useState } from "react";
import ClipsBox from "../../../../components/web/ClipsBox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion_custom"
import { useRouter } from "next/navigation";
import { Subscription } from "@supabase/supabase-js";

const increaseTotalRequests = async () => {
  try {
    await axios.get('/api/supabase/increase-requests');
  } catch (error) {
    console.log(error)
  }
}

const getRequestStatus = async () => {
  const res = await axios.get('/api/supabase/check-status');
  return res.data.result
}

const setRequestStatus = async (statusValue: boolean) => {
  const some = await axios.post('/api/supabase/check-status', { updateData: statusValue })
}

const storeTwitchUrl = async (url: string) => {
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

const reduceTrialRequests = async () => {
  try {
    await axios.get('/api/supabase/reduce-trial-requests')
  } catch (error) {
    console.log(error)
  }
}

const getUserData = async (supabase: any) => {
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

const getUserSubscription = async (supabase: any) => {
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

const saveLastTwitchUrl = async (supabase: any, twitch_url: string) => {
  try {
    const user = await getUserData(supabase);
    await supabase
      .from('users')
      .update({ last_twitch_url: twitch_url })
      .eq('id', user.id)
  } catch (error) {
    console.log(error)
  }
}

const getLastTwitchUrl = async (supabase: any) => {
  try {
    const user = await getUserData(supabase)
    const { data, error } = await supabase
      .from('users')
      .select('last_twitch_url')
      .eq('id', user.id)
    return data[0].last_twitch_url
  } catch (error) {
    console.log(error)
  }
}

const getServerBusyStatus = async (supabase: any) => {
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

export default function TwitchClips() {
  const [url, setUrl] = useState<string>("");
  const [twitchUrl, setTwitchUrl] = useState<string>("");
  const [urlBanner, setUrlBanner] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [clipsData, setClipsData] = useState<any[] | null>(null);
  const [message, setMessage] = useState<boolean>(false);
  const [requestMessage, setRequestMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [tshour, setTshour] = useState<number>(0);
  const [tsmin, setTsmin] = useState<number>(0);
  const [tssec, setTssec] = useState<number>(0);
  const [userSubscription, setUserSubscription] = useState<Subscription>();
  const [userdata, setUserdata] = useState<any>();
  const [trialLeft, setTrialLeft] = useState<number>();
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const { supabase } = useSupabase();
  const router = useRouter();

  const getClipsData = async () => {
    async function wait(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    let clipsData, user_busy_status;

    do {
      clipsData = await axios.get(`/api/fusionclipsai/twitch`);
      user_busy_status = clipsData.data.status;

      if (user_busy_status) {
        console.log("Waiting for the process to complete...");
        await wait(20000);
      }
    } while (user_busy_status);

    return clipsData;
  };

  const twitchUrlSubmit = async (url: string) => {
    setErrorMessage(false);
    setMessage(false);
    setLoading(true);
    try {
      storeTwitchUrl(url);
      await reduceTrialRequests()
      increaseTotalRequests();
      const timestamps = {
        hour: tshour,
        min: tsmin,
        sec: tssec
      }
      setTshour(0);
      setTsmin(0);
      setTssec(0);
      await axios.post(`/api/fusionclipsai/twitch`, { url, timestamps });
      const clipsData = await getClipsData();
      const finalClips = clipsData.data.data;
      if (finalClips.length == 0) {
        setMessage(true);
        setLoading(false);
        setBtnLoading(false);
      } else {
        setClipsData(finalClips);
        setLoading(false);
        setBtnLoading(false);
      }
    }
    catch {
      console.log("Some Error");
      setLoading(false);
      setBtnLoading(false);
      setErrorMessage(true);
    }
    getSubscription()
    getUser()
  }

  const validateUser = async () => {
    if (!userSubscription) {
      if (userdata) {
        const trial_req = userdata.trial_requests
        if (trial_req > 0) {
          return true;
        }
      }
      return false;
    } else {
      return true;
    }
  }

  const handleURLSubmit = async () => {
    setBtnLoading(true);
    const allow = await validateUser();
    if (allow) {
      const urlPattern1 = /^(https?:\/\/)?(www\.)?twitch\.tv\/videos\/\d+$/;
      const urlPattern2 = /^(https?:\/\/)?(www\.)?twitch\.tv\/[a-zA-Z0-9_]+\/video\/\d+$/;
      var inputUrl = url
      if (!inputUrl.startsWith("https://")) {
        inputUrl = "https://" + inputUrl
      }
      const lastTwitchUrl = await getLastTwitchUrl(supabase)
      if (lastTwitchUrl !== inputUrl) {
        await saveLastTwitchUrl(supabase, inputUrl);
        setTwitchUrl(inputUrl);
        setUrl("");
        if (urlPattern1.test(inputUrl) || urlPattern2.test(inputUrl)) {
          setUrlBanner(false);
          twitchUrlSubmit(inputUrl);
        } else {
          setUrlBanner(true);
          setBtnLoading(false);
        }
      }
      const finalClips = userdata.last_request_data
      setClipsData(finalClips);
      setBtnLoading(false);
    } else {
      router.push("/pricing")
    }
  }

  const getUser = async () => {
    const user = await getUserData(supabase);
    setUserdata(user)
    setTrialLeft(user.trial_requests)
  }
  const getSubscription = async () => {
    const userSub = await getUserSubscription(supabase)
    setUserSubscription(userSub)
  }

  const checkUserRequests = async () => {
    const userServerBusy = await getServerBusyStatus(supabase);
    if (userServerBusy) {
      setLoading(true)
      setRequestMessage(true)
      setBtnLoading(true)
      const clipsData = await getClipsData()
      const finalClips = clipsData.data.data;
      setClipsData(finalClips)
      setLoading(false)
      setRequestMessage(false)
      setBtnLoading(false)
    }
  }

  useEffect(() => {
    getUser()
    getSubscription()
    checkUserRequests()
  }, [])

  return (
    <>
      {
        userSubscription ?
          ""
          :
          <div className="my-5 bg-yellow-300 text-black py-2 text-center font-bold">
            <p>You are on a Free Trial, You have {trialLeft} more requests left!</p>
          </div>
      }
      <div className="flex flex-col m-10 lg:mt-60">
        <h1 className="text-7xl font-bold text-center">Scrape <span className="text-primary_pink">Clips</span> from <span className="text-primary_blue">Twitch</span> Streams</h1>
        <div className="text-base font-light my-5 mx-auto">
          <form action="">
            <div className="flex lg:flex-row flex-col items-center justify-start gap-5">
              <Input
                type="text"
                value={url}
                className="lg:w-fit"
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter Twitch URL here"
              />
              <Button
                variant="default"
                type="submit"
                disabled={url ? loading ? true : false : true}
                onClick={(e) => {
                  e.preventDefault();
                  handleURLSubmit();
                }}
              >
                {
                  btnLoading ?
                    "Loading..."
                    :
                    "Get Clips"
                }
              </Button>
            </div>
          </form>
        </div>
        <div>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-center">Advanced Options</AccordionTrigger>
              <AccordionContent className="text-center">
                <h3 className="mb-4 font-semibold">Timestamps</h3>
                <h5 className="mb-2 text-xs">Start Time <p><span className="text-primary_pink text-center">AI</span> will start analyzing from these time-stamps</p></h5>
                <div className="flex items-center justify-center gap-2">
                  <label htmlFor="hour">Hour</label>
                  <Input value={tshour} onChange={(e) => {
                    const parsedValue = parseInt(e.target.value, 10);
                    if (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 99) {
                      setTshour(parsedValue);
                    }
                  }} className="w-12 px-1" id="hour" type="number" max={99} min={0} placeholder="2h" />
                  <label htmlFor="min">min</label>
                  <Input value={tsmin} onChange={(e) => {
                    const parsedValue = parseInt(e.target.value, 10);
                    if (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 99) {
                      setTsmin(parsedValue);
                    }
                  }} className="w-12 px-1" id="min" type="number" max={59} min={0} placeholder="5m" />
                  <label htmlFor="sec">sec</label>
                  <Input value={tssec} onChange={(e) => {
                    const parsedValue = parseInt(e.target.value, 10);
                    if (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 99) {
                      setTssec(parsedValue);
                    }
                  }} className="w-12 px-1" id="sec" type="number" max={59} min={0} placeholder="10s" />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <ClipsBox
          loading={loading}
          message={message}
          errorMessage={errorMessage}
          clipsData={clipsData}
          twitch_url={twitchUrl}
        />
        {
          requestMessage ?
            <Alert className="w-fit fixed bottom-0 right-0 m-20 bg-red-600" >
              <div className="w-full flex justify-between">
                <AlertTitle>A Request is already in process!</AlertTitle>
                <button
                  onClick={() => setRequestMessage(false)}
                >
                  <Image alt="svgImg" width={20} height={20} src="/cross.png" />
                </button>
              </div>
              <AlertDescription>
                You can make only 1 request at a time, please wait for the request to finish.
              </AlertDescription>
            </Alert>
            :
            ""
        }
        {
          urlBanner ?
            <Alert className="w-fit fixed bottom-0 right-0 m-20 bg-red-600" >
              <div className="w-full flex justify-between">
                <AlertTitle>Invalid URL!</AlertTitle>
                <button
                  onClick={() => setUrlBanner(false)}
                >
                  <Image alt="svgImg" width={20} height={20} src="/cross.png" />
                </button>
              </div>
              <AlertDescription>
                Please use a Past Broadcast URL (https://www.twitch.tv/videos/12345XXXXX)
              </AlertDescription>
            </Alert>
            :
            ""
        }
      </div>
    </>
  )
}