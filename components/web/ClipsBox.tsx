import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import ClipCard from "./ClipCard";
import { Button } from "../ui/button";

export default function ClipsBox({
  loading,
  clipsData,
  message,
  errorMessage,
  twitch_url }: {
    loading: boolean,
    clipsData: any[] | null,
    message: boolean,
    errorMessage: boolean,
    twitch_url: string
  }) {
  return (
    <div className="text-center my-5">
      <h2 className="font-bold text-2xl uppercase">Scraped Clips</h2>
      <Badge variant="secondary">
        60 min of Stream will be Analyzed
      </Badge> 
      {
        loading ?
          <div className="flex flex-col gap-5 justify-center items-center h-80">
            <Image src="/spinner.png" className={`animate-spin`} width={80} height={80} alt="spinner" />
            <h3>This may take few minutes...</h3>
          </div>
          :
          <div className="w-full">
            {
              clipsData ?
                <>
                  {/* <div className="grid lg:grid-cols-2 gap-4 mx-auto mt-10"> */}
                  <div className="grid lg:grid-cols-2 gap-4 mx-auto mt-10">
                    {
                      clipsData.map((c: any, k) => (
                        <ClipCard
                          time_stamp={c.time_stamp}
                          f_score={c.funniness_score}
                          twitch_url={twitch_url}
                          key={k} />
                      ))
                    }
                  </div>
                  <div className="mt-20 text-base">
                    <h3 className="text-xl">{`Don't find your clip here?`}</h3>
                    <p>Please Help us Improve the Performace of FusionClips AI</p>
                    <Link href="/report-missing-clip">
                      <p className="text-red-500 underline">Report Missing Clip</p>
                    </Link>
                  </div>
                </>
                :
                <div className="flex justify-center items-center h-80">
                  <div>
                    {
                      message ?
                        <div>
                          <h3>Fusion Clips AI Failed to Find Enough Content</h3>
                          <p>Please Help us Improve the Performace of FusionClips AI</p>
                          <Link href="/report-missing-clip">
                            <p className="text-red-400 underline">Report Missing Clip</p>
                          </Link>
                        </div>
                        :
                        <div>
                          {
                            errorMessage ?
                              <div>
                                <h3 className="text-red-400 font-semibold text-xl">Internal Server Error Occured</h3>
                                <p className="text-red-400">Please Try Again</p>
                              </div>
                              :
                              <div>
                                <h3 className="text-muted-foreground font-semibold text-xl">No Clips to Display</h3>
                                <p className="text-muted-foreground">Your scraped clips will appear here</p>
                              </div>
                          }
                        </div>
                    }
                  </div>
                </div>
            }
          </div>
      }
    </div>
  )
}