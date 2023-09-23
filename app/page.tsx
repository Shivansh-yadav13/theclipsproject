"use client"
import type { NextPage } from "next";
import { redirect } from "next/navigation";
// import Card from "../components/web/Card";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
// import Navbar from "../components/web/Navbar";
// import Footer from "../components/web/Footer";
// import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Card from "@/components/web/Card";
import Navbar from "@/components/web/Navbar";
// Shadcn imports
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const Index: NextPage = () => {
  const [url, setUrl] = useState<string>("");
  // const [session, setSession] = useState<Session | null>();
  // const supabase = createClientComponentClient()

  // useEffect(() => {
  //   const getSession = async () => {
  //     const session = await supabase.auth.getSession();
  //     setSession(session.data.session)
  //   }

  //   getSession()
  // }, [])
  return (
    <>
      <Navbar />
      <div className='lg:mt-20 flex flex-col h-screen justify-between antialiased'>
        <div className="w-full">
          <div className="w-full mx-auto">
            <div className="mb-72">
              <div className="mb-10 flex flex-col lg:flex-row justify-between xl:mx-20 2xl:mx-60">
                <div className="md:text-6xl text-3xl font-extrabold mx-5 text-center lg:text-start lg:text-5xl xl:text-7xl">
                  <h1>Long Live Streams to,</h1>
                  <h1><span className="text-primary_pink">Engaging </span>Clips,</h1>
                  <h1 className="text-primary_blue">With 1-Click</h1>
                  <div className="text-lg lg:w-2/3 mx-auto lg:mx-0 font-semibold text-muted-foreground pt-2">
                    <p>FusionClips uses <span className="text-primary">Artificial intelligence</span> to find out Best Clips from your Gaming Streams</p>
                  </div>
                  <div className="text-base font-light my-5">
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
                          disabled={url ? false : true}
                          onClick={() => redirect("/account")}
                        >
                          {/* <Link href="/clips/twitch"> */}
                          Get Clips
                          {/* </Link> */}
                        </Button>
                      </div>
                    </form>
                  </div>
                  <div className="w-fit lg:flex items-center justify-start gap-5">
                    {/* <a href="https://www.producthunt.com/posts/fusionclips?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-fusionclips" target="_blank">
                  <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=410171&theme=light" alt="FusionClips - Convert&#0032;boring&#0032;streams&#0032;to&#0032;funny&#0032;attention&#0032;grabbing&#0032;clips | Product Hunt" width="250" height="54" />
                </a> */}
                  </div>
                </div>
                <div className="w-2/5 hidden lg:block">
                  <AspectRatio ratio={16 / 9} className="mx-auto">
                    <Image src="/twitch.png" className="mx-auto" fill alt="twtich" />
                  </AspectRatio>
                </div>
                <Image src="/twitch.png" className="mx-auto lg:hidden" width={1280} height={720} alt="twtich" />
              </div>
              <div>
                <div>
                  <h1 className="font-extrabold text-gray-400 text-lg lg:text-3xl text-center select-none">
                    Supported Platforms
                  </h1>
                </div>
                <div className="flex justify-center items-center gap-20 w-full overflow-x-scroll scrol">
                  <Image src="/twitch_logo_white.png" className="grayscale opacity-60 backdrop-grayscale-0" alt="twitch" width={150} height={100} />
                  <Image src="/youtube_logo.png" className="grayscale opacity-90 backdrop-grayscale-0" alt="youtube" width={150} height={250} />
                  <Image src="/kick_logo.png" className="grayscale opacity-90 backdrop-grayscale-0" alt="kick" width={130} height={1} />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center mt-10">
              <div id="features" className="w-full flex justify-center items-center">
                <div className="lg:w-2/3 mx-2">
                  <h1 className="font-extrabold text-2xl xl:text-5xl md:text-4xl text-center">
                    Tired of watching your long Streams to find Content?
                  </h1>
                  <p className="text-center mt-5 text-sm text-gray-500 lg:text-xl md:text-xl sm:mx-2">Using <span className="text-primary">Artificial intelligence</span> convert your long <span className="text-primary_blue">Boooring</span> streams to <span className="text-primary_pink">Attention</span> Grabbing Clips</p>
                  <div className="flex justify-center mt-10">
                    <Link href="/clips">
                      <Button
                        variant="default"
                        onClick={() => redirect("/clips")}
                      >
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="mt-20 lg:w-2/3 lg:inline-grid lg:grid-cols-2 mx-5 flex flex-col gap-5">
                <Card title="AI Funny Clip Finder" emo="🔎" desc="Using AI find the most Engaging & Funny Clips from your video/live-streams." />
                <Card title="AI Generated Captions" emo="🆎" desc="Auto Generated Captions with the use of Automatic Speech Recognition (ASR) system which supports 98 Languages." tag="Coming Soon" />
                <Card title="Emojis Support" emo="😊" desc="Automatic Emojis added in each sentence to glow up the captions." tag="Coming Soon" />
                <Card title="Customization" emo="✏️" desc="Edit all Caption or Emojis, change the effect of captions on screen." tag="Coming Soon" />
              </div>
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Index;
