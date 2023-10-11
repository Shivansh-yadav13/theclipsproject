"use client"
import type { NextPage } from "next";
import { redirect } from "next/navigation";
// import Card from "../components/web/Card";
import Link from "next/link";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
// import Navbar from "../components/web/Navbar";
// import Footer from "../components/web/Footer";
// import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Card from "@/components/web/Card";
import Navbar from "@/components/web/Navbar";
// Shadcn imports
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Footer from "@/components/web/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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
      <div className='flex flex-col h-screen justify-between antialiased'>
        <Navbar />
        <div className="lg:mt-20 mt-10 w-full">
          <div className="w-full mx-auto">
            <div className="xl:mb-20 mb-10">
              <div className="mb-10 flex flex-col lg:flex-row justify-between xl:mx-20 2xl:mx-60">
                <div className="md:text-6xl text-3xl font-extrabold mx-5 text-center lg:text-start lg:text-5xl xl:text-7xl">
                  <h1>Long Live Streams to,</h1>
                  <h1><span className="text-primary_pink">Engaging </span>Clips,</h1>
                  <h1 className="text-primary_blue">With 1-Click</h1>
                  <div className="text-lg lg:w-2/3 mx-auto lg:mx-0 font-semibold text-muted-foreground pt-2">
                    <p>FusionClips uses <span className="text-primary">Artificial intelligence</span> to find out Best Clips from your Gaming Streams</p>
                  </div>
                  <div className="text-base font-light my-5">
                    <div className="flex lg:flex-row flex-col items-center justify-start gap-5">
                      <Input
                        type="text"
                        value={url}
                        className="lg:w-fit"
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter URL here"
                      />
                      <Link href="/clips">
                        <Button
                          variant="default"
                        >
                          Get Clips
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="w-2/5 hidden lg:block">
                  <AspectRatio ratio={16 / 9} className="mx-auto">
                    <Image src="/twitch.png" className="mx-auto" fill alt="twtich" />
                  </AspectRatio>
                </div>
                <Image src="/twitch.png" className="mx-auto lg:hidden" width={1280} height={720} alt="twtich" />
              </div>
              <div className="mt-20 xl:scale-150">
                <div>
                  <h1 className="font-extrabold text-gray-400 text-lg lg:text-3xl text-center select-none">
                    Supported Platforms
                  </h1>
                </div>
                <div className="flex justify-center items-center gap-20 w-full overflow-x-scroll">
                  <Image src="/twitch_logo_white.png" className="grayscale hover:grayscale-0 hover:opacity-100 opacity-60 transform duration-300" alt="twitch" width={150} height={100} />
                  {/* <Image src="/youtube_logo.png" className="grayscale hover:grayscale-0 hover:opacity-100 opacity-90 transform duration-300" alt="youtube" width={150} height={250} /> */}
                  <Image src="/kick_logo.png" className="grayscale hover:grayscale-0 hover:opacity-100 opacity-90 transform duration-300" alt="kick" width={130} height={1} />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div id="features" className="w-full flex justify-center items-center">
                <div className="lg:w-2/3 mx-2">
                  <h1 className="font-extrabold text-2xl xl:text-7xl md:text-4xl text-center">
                    Tired of watching your long Streams to find Content?
                  </h1>
                  <p className="text-center mt-5 text-sm text-gray-500 lg:text-xl md:text-xl sm:mx-2">Using <span className="text-primary">Artificial intelligence</span> convert your long <span className="text-primary_blue">Boooring</span> streams to <span className="text-primary_pink">Attention</span> Grabbing Clips</p>
                  <div className="flex justify-center mt-10">
                    <Link href="/clips">
                      <Button
                        variant="default"
                      >
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full my-20 mx-4 flex flex-col lg:flex-row justify-evenly gap-10">
              <div className="mx-auto text-center py-5 px-2 w-3/4 lg:w-1/5 border-4 border-muted rounded-lg bg-primary-foreground hover:border-primary_pink transform duration-150">
                <h1 className="text-2xl font-bold my-2">1. AI Stream Analyzers</h1>
                <p className="text-sm xl:text-lg font-light text-muted-foreground">Using <span className="text-primary">Artificial intelligence</span> find the most <span className="text-primary">Entertaining</span> Clips from your video/live-streams.</p>
              </div>
              <div className="mx-auto text-center py-5 px-2 w-3/4 lg:w-1/5 border-4 border-muted rounded-lg bg-primary-foreground hover:border-primary_pink transform duration-150">
                <h1 className="text-2xl font-bold my-2">2. Convert Clips to Shorts Format</h1>
                <p className="text-sm xl:text-lg font-light text-muted-foreground">Converted all <span className="text-primary">AI</span> generated clips into <span className="text-primary">Short-Form</span> content for social media.</p>
              </div>
              <div className="mx-auto text-center py-5 px-2 w-3/4 lg:w-1/5 border-4 border-muted rounded-lg bg-primary-foreground hover:border-primary_pink transform duration-150">
                <h1 className="text-2xl font-bold my-2">3. AI Generated Captions and Emojis</h1>
                <p className="text-sm xl:text-lg font-light text-muted-foreground">Add AI generated <span className="text-primary">Captions and Emojis</span> to your clips conveted to short-form content.</p>
              </div>
            </div>
          </div>
          <div className="w-fit mx-auto text-center flex flex-col gap-5">
            <h1 className="text-3xl font-bold">Join Our Community</h1>
            <p className="text-muted-foreground">Join the community of passionate Streamers using FusionClips AI to make high quality social media clips.</p>
            <a target="_blank" href="https://discord.gg/jZpN9g47c5">
              <Button className="w-fit mx-auto">Join Discord Channel</Button>
            </a>
          </div>
          <div className="flex justify-center lg:w-1/2 lg:mx-auto mx-5 mt-20">
            <Accordion type="single" collapsible className="w-full">
              <h3 className="font-semibold text-xl">Frequently Asked Questions</h3>
              <AccordionItem value="item-1">
                <AccordionTrigger>How does it work?</AccordionTrigger>
                <AccordionContent>
                  FusionClips AI is trained on best performing and entertaining clips from platforms like Twitch, YouTube etc. It analyzes your stream
                  and scrape out the best parts, which are supposed to be Funny, exciting or entertaining.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Why did I not receive any clips for my stream?</AccordionTrigger>
                <AccordionContent>
                  It may happen that you did not receive any clips from your stream, it&apos;s because your stream probably does not contain such patterns
                  for the AI to understand that any part of it was supposed to be cliped. Common reasons are that there is very less noise in the stream, or most of
                  the part is slient or low-pitched.
                  <br />
                  <br />
                  We are continously improving the performance of our AI, and so, if you still think there were parts of stream which should be clipped by the AI, then please
                  help us improve the AI by submitted your stream <span className="underline"><Link href="/report-missing-clip">here.</Link></span>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Index;
