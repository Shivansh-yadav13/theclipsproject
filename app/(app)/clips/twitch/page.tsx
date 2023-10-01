"use client"

import axios from "axios";
import Image from "next/image"
import { useSupabase } from '@/app/supabase/supabase-provider';
import { useState } from "react";
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

  const tempUrlSubmit = async (url: string) => {
    setErrorMessage(false);
    setMessage(false);
    setLoading(true);
    try {
      const status = await getRequestStatus()
      if (!status) {
        await setRequestStatus(true);
        storeTwitchUrl(url);
        increaseTotalRequests();
        const timestamps = {
          hour: tshour,
          min: tsmin,
          sec: tssec
        }
        setTshour(0);
        setTsmin(0);
        setTssec(0);
        const result = await axios.post(`/api/fusionclipsai/twitch`, { url, timestamps });
        const clipsData = await getClipsData();
        const finalClips = clipsData.data.data;
        console.log(finalClips, clipsData.data)
        if (finalClips.length == 0) {
          setMessage(true);
          setLoading(false);
          setBtnLoading(false);
        } else {
          setClipsData(finalClips);
          setLoading(false);
          setBtnLoading(false);
        }
        await setRequestStatus(false)
      } else {
        setRequestMessage(true);
        setBtnLoading(false);
      }
    }
    catch {
      console.log("Some Error");
      setLoading(false);
      setBtnLoading(false);
      setErrorMessage(true);
      await setRequestStatus(false);
    }
    await setRequestStatus(false);
  }

  const handleURLSubmit = async () => {
    setBtnLoading(true);
    const userResponse = await supabase.auth.getUser();
    if (userResponse.error) {
      console.log(userResponse.error)
      router.push("/account")
    }
    if (userResponse.data.user) {
      const userID = userResponse.data.user.id;
      const { data, error } = await supabase
        .from('subscriptions')
        .select()
        .eq('user_id', userID)
      if (error) {
        console.log(error)
        router.push("/account")
      }
      console.log(data);
      if (data?.length == 0) {
        router.push("/pricing")
      } else {
        const urlPattern1 = /^(https?:\/\/)?(www\.)?twitch\.tv\/videos\/\d+$/;
        const urlPattern2 = /^(https?:\/\/)?(www\.)?twitch\.tv\/[a-zA-Z0-9_]+\/video\/\d+$/;
        var inputUrl = url
        if (!inputUrl.startsWith("https://")) {
          inputUrl = "https://" + inputUrl
        }
        setTwitchUrl(inputUrl);
        setUrl("");
        if (urlPattern1.test(inputUrl) || urlPattern2.test(inputUrl)) {
          setUrlBanner(false);
          tempUrlSubmit(inputUrl);
        } else {
          setUrlBanner(true);
          setBtnLoading(false);
        }
      }
    } else {
      router.push("/account")
    }
  }

  return (
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
  )
}