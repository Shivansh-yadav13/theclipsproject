"use client"

import Link from "next/link";
import { Badge } from "@/components/ui/badge"

export default function PricingPage() {
  return (
    <>
      <div className="sm:flex sm:flex-col sm:align-center p-10">
        <h1 className="font-extrabold text-5xl text-center my-10">Plans</h1>
        {/* <div className="relative self-center bg-slate-200 rounded-lg p-0.5 flex">
                    <button type="button"
                        className="relative w-1/2 rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none sm:w-auto sm:px-8 bg-slate-50 border-slate-50  shadow-sm">Monthly
                        billing
                    </button>
                    <button type="button"
                        className="ml-0.5 relative w-1/2 border rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none sm:w-auto sm:px-8 border-transparent ">Yearly
                        billing
                    </button>
                </div> */}
        <div className="flex justify-center">
          <div className="border border-primary_pink rounded-lg shadow-sm divide-y divide-primary_pink">
            <div className="p-6">
              <h2 className="text-xl leading-6 font-bold ">Streamer Mode</h2>
              <p className="mt-2 text-base text-muted-foreground leading-tight">For streamers who want to attract viewers from engaging live moments.</p>
              <p className="mt-2 text-base text-muted-foreground leading-tight">Create Content 10x Faster.</p>
              <p className="mt-8">
                <span className="text-4xl font-bold line-through decoration-primary_pink tracking-tighter">$20</span>
                <span className="text-4xl font-bold tracking-tighter ml-3">$10</span>
                <span className="text-base font-medium">/mo</span>
              </p>
              <Link href="/pricing" className="mt-8 block w-full bg-primary cursor-default rounded-md py-2 text-sm font-semibold text-secondary text-center">Purchase</Link>
            </div>
            <div className="pt-6 pb-8 px-6">
              <h3 className="text-sm font-bold  tracking-wide uppercase">{`What's included`}</h3>
              <ul role="list" className="mt-4 space-y-3">
                <li className="flex space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-green-400" width="24"
                    height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l5 5l10 -10"></path>
                  </svg>
                  <span className="text-base ">AI Stream Analyzer</span>
                </li>
                <li className="flex space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-green-400" width="24"
                    height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l5 5l10 -10"></path>
                  </svg>
                  <span className="text-base ">Gaming Streams to Shorts Format <Badge>Coming Soon</Badge></span>
                </li>
                <li className="flex space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-green-400" width="24"
                    height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l5 5l10 -10"></path>
                  </svg>
                  <span className="text-base">AI generated Captions <Badge>Coming Soon</Badge></span>
                </li>
                <li className="flex space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-green-400" width="24"
                    height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l5 5l10 -10"></path>
                  </svg>
                  <span className="text-base ">180 min / stream</span>
                </li>
                <li className="flex space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-green-400" width="24"
                    height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l5 5l10 -10"></path>
                  </svg>
                  <span className="text-base ">5 Requests / day</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="min-h-screen -z-20 flex justify-center items-center">
        <div className="">
            <div className="flex justify-between">
                <div className="w-80 p-8 bg-black text-center text-white border-4 shadow-xl">
                    <h1 className="text-white font-semibold text-2xl">Streamer</h1>
                    <p className="pt-2 tracking-wide">
                        <span className="text-gray-400 align-top">$ </span>
                        <span className="text-3xl font-semibold">20</span>
                        <span className="text-gray-400 font-medium">/ month</span>
                    </p>
                    <hr className="mt-4 border-1 border-gray-600"/>
                    <div className="pt-8">
                        <p className="font-semibold text-gray-400 text-left pt-5">
                            <span className="text-2xl align-middle">
                                🤣
                            </span>
                            <span className="pl-2">
                                Scrape All Funny & Attention Grabbing Content from Long Video/Stream.
                            </span>
                        </p>
                        <p className="font-semibold text-gray-400 text-left pt-5">
                            <span className="text-2xl align-middle">
                                🆎
                            </span>
                            <span className="pl-2">
                                Add Automated Captions to Clips.
                            </span>
                        </p>
                        <p className="font-semibold text-gray-400 text-left pt-5">
                            <span className="text-2xl align-middle">
                                🫡
                            </span>
                            <span className="pl-2">
                                Emoji Supported in Captions.
                            </span>
                        </p>
                        <p className="font-semibold text-gray-400 text-left pt-5">
                            <span className="text-2xl align-middle">
                                ⏲️
                            </span>
                            <span className="pl-2">
                                60 Minutes Long Video Support.
                            </span>
                        </p>
                        <p className="w-full py-4 bg-white text-black font-bold mt-8 rounded-xl select-none">
                            Coming Soon
                        </p>
                    </div>
                </div>
                <div className="w-80 p-8 bg-black text-center text-white border-4 shadow-xl transform scale-125">
                    <h1 className="text-white font-semibold text-2xl">Streamer</h1>
                    <p className="pt-2 tracking-wide">
                        <span className="text-gray-400 align-top">$ </span>
                        <span className="text-3xl font-semibold">20</span>
                        <span className="text-gray-400 font-medium">/ month</span>
                    </p>
                    <hr className="mt-4 border-1 border-gray-600"/>
                    <div className="pt-8">
                        <p className="font-semibold text-gray-400 text-left pt-5">
                            <span className="text-2xl align-middle">
                                🤣
                            </span>
                            <span className="pl-2">
                                Scrape All Funny & Attention Grabbing Content from Long Video/Stream.
                            </span>
                        </p>
                        <p className="font-semibold text-gray-400 text-left pt-5">
                            <span className="text-2xl align-middle">
                                🆎
                            </span>
                            <span className="pl-2">
                                Add Automated Captions to Clips.
                            </span>
                        </p>
                        <p className="font-semibold text-gray-400 text-left pt-5">
                            <span className="text-2xl align-middle">
                                🫡
                            </span>
                            <span className="pl-2">
                                Emoji Supported in Captions.
                            </span>
                        </p>
                        <p className="font-semibold text-gray-400 text-left pt-5">
                            <span className="text-2xl align-middle">
                                ⏲️
                            </span>
                            <span className="pl-2">
                                60 Minutes Long Video Support.
                            </span>
                        </p>
                        <p className="w-full py-4 bg-white text-black font-bold mt-8 rounded-xl select-none">
                            Coming Soon
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div> */}
      {/* <Pricing
      session={session}
      user={session?.user}
      products={products}
      subscription={subscription}
    /> */}
    </>
  );
}
