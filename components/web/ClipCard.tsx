import { Button } from "../ui/button";
import axios from "axios";
import { useState } from "react";
import Image from "next/image";

export default function ClipCard({ time_stamp, f_score, twitch_url }: { time_stamp: number, f_score: number, twitch_url: string }) {
  const [downloading, setDownloading] = useState<boolean>(false);
  const [clipModal, setClipModal] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const twitchVODId = twitch_url.replace("https://www.twitch.tv/videos/", "")
  const handleDownload = async () => {
    try {
      setDownloading(true);
      const formData = new FormData();
      formData.append("twitch_url", twitch_url)
      const seconds = time_stamp.toString()
      formData.append('start_timestamps_sec', seconds)
      setProgress(30);
      const response = await axios.post("https://fusionclipsai.up.railway.app/download_clip", formData);
      const video_data = response.data;
      setProgress(70);
      const videoBlob = new Blob([Buffer.from(video_data, 'base64')], { type: 'video/mp4' });

      const videoUrl = URL.createObjectURL(videoBlob);

      const link = document.createElement('a');
      link.href = videoUrl;
      link.download = `fusion-clips-${twitch_url.replace("https://www.twitch.tv/videos/", "")}-${seconds}.mp4`;
      link.click();

      URL.revokeObjectURL(videoUrl);
      setProgress(100)
      setDownloading(false);
    } catch (error) {
      setDownloading(false);
      console.error("Error downloading clip:", error);
    }
  };
  return (
    <div className="md:flex justify-between bg-primary-foreground py-10 px-5 rounded-lg text-xl">
      {
        clipModal ?
          <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform rounded-lg bg-primary-foreground text-left shadow-xl transition-all w-fit py-10 px-20">
                  <iframe
                    className="mx-auto overflow-hidden 2xl:block hidden mb-5"
                    src={`https://player.twitch.tv/?video=${twitchVODId}&parent=fusionclips.pro`}
                    height="400"
                    width="600"
                    allowFullScreen={false}
                  ></iframe>
                  <div className="bg-primary-foreground rounded-xl px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <Button type="button" onClick={handleDownload} disabled={downloading} className="inline-flex w-full justify-center px-3 py-2 text-sm font-semibold  sm:ml-3 sm:w-auto">Download Clip</Button>
                    <Button type="button" onClick={() => setClipModal(false)} className="mt-3 inline-flex w-full justify-center px-3 py-2 text-sm font-semibold ring-1 ring-inset sm:mt-0 sm:w-auto">Close</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          :
          ""
      }
      <button className="hover:scale-110 transform duration-150" onClick={() => setClipModal(true)}>
        <Image src="/play_icon.png" width={50} height={20} alt="play" />
      </button>
      <div className="flex flex-col md:text-start text-center">
        <p><span className="font-bold">Section: </span>{`${Math.floor(time_stamp / 3600) == 0 ? "" : Math.floor(time_stamp / 3600) + ':'}${Math.floor((time_stamp % 3600) / 60)}:${time_stamp % 60} - ${Math.floor((time_stamp + 60) / 3600) == 0 ? "" : Math.floor((time_stamp + 60) / 3600)}${Math.floor(((time_stamp + 60) % 3600) / 60)}:${(time_stamp + 60) % 60}`}</p>
        <p><span className="font-bold text-primary_pink">Engagement Rate: </span>{(f_score * 100) == 100 ? (f_score * 100) : (f_score * 100).toFixed(1)}%</p>
      </div>
      <div className="flex items-center justify-center">
        <Button variant="link">
          <a target="_blank" href={twitch_url + `?t=${time_stamp}s`} >Watch on Twitch</a>
        </Button>
        <Button onClick={handleDownload} disabled={downloading}>
          Download Clip
          {/* <Image src="/download_icon.png" width={30} height={40} alt="Download clip" /> */}
        </Button>
      </div>
    </div>
    // <div className="bg-primary-foreground border-primary_blue border-2 w-fit mx-auto rounded-lg p-10 text-start text-xl my-10">
    //   <div className="aspect-video mb-5">
    //     <iframe
    //       className="mx-auto overflow-hidden 2xl:block hidden"
    //       src={`https://player.twitch.tv/?video=${twitchVODId}&parent=fusionclips.pro`}
    //       height="400"
    //       width="600"
    //       allowFullScreen={false}
    //     ></iframe>
    //     <iframe
    //       className="mx-auto overflow-hidden 2xl:hidden"
    //       src={`https://player.twitch.tv/?video=${twitchVODId}&parent=fusionclips.pro`}
    //       width="300"
    //       height="169"
    //       allowFullScreen={false}
    //     ></iframe>
    //   </div>
    //   <div className="2xl:flex 2xl:items-center 2xl:text-2xl 2xl:text-start text-base text-center">
    //     <div className="flex flex-col mx-auto">
    //       <p><span className="font-bold">Section: </span>{`${Math.floor(time_stamp / 3600) == 0 ? "" : Math.floor(time_stamp / 3600) + ':'}${Math.floor((time_stamp % 3600) / 60)}:${time_stamp % 60} - ${Math.floor((time_stamp + 60) / 3600) == 0 ? "" : Math.floor((time_stamp + 60) / 3600)}${Math.floor(((time_stamp + 60) % 3600) / 60)}:${(time_stamp + 60) % 60}`}</p>
    //       <p><span className="font-bold text-primary_pink">Engagement Rate: </span>{(f_score * 100) == 100 ? (f_score * 100) : (f_score * 100).toFixed(1)}%</p>
    //     </div>
    //     <div className="flex flex-col w-fit mx-auto text-3xl">
    //       <Button variant="link">
    //         <a target="_blank" href={twitch_url + `?t=${time_stamp}s`} >Watch on Twitch</a>
    //       </Button>
    //       <Button onClick={handleDownload} disabled={downloading}>Download Clip</Button>
    //     </div>
    //   </div>
    //   {
    //     downloading ?
    //       <Alert className="w-fit flex flex-col gap-3 fixed bottom-0 lg:right-0 right-2 m-20 bg-primary-foreground" >
    //         <AlertTitle>Downloading Clip...</AlertTitle>
    //         <AlertDescription>
    //           <p className="mb-2 text-base">{twitch_url + `?t=${time_stamp}s`}</p>
    //           <Progress value={progress} className="w-full" />
    //         </AlertDescription>
    //       </Alert>
    //       :
    //       ""
    //   }
    // </div>
  )
}