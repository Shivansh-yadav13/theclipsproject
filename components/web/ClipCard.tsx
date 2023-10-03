import Link from "next/link";
import { Button } from "../ui/button";
import { Progress } from "@/components/ui/progress"
import axios from "axios";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import Image from "next/image";


export default function ClipCard({ time_stamp, f_score, twitch_url }: { time_stamp: number, f_score: number, twitch_url: string }) {
  const [downloading, setDownloading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const handleDownload = async () => {
    try {
      setDownloading(true);
      const formData = new FormData();
      formData.append("twitch_url", twitch_url)
      const seconds = time_stamp.toString()
      formData.append('start_timestamps_sec', seconds)
      setProgress(30);
      const response = await axios.post("http://157.230.236.14:5000/download_clip", formData);
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
    <div className="bg-primary-foreground border-primary_blue border-2 w-fit mx-auto rounded-lg p-10 text-start text-xl my-10">
      <div className="aspect-video mb-5">
        <iframe
          className="mx-auto overflow-hidden 2xl:block hidden"
          src="https://player.twitch.tv/?video=1922395449&parent=fusionclips.pro"
          height="400"
          width="600"
          allowFullScreen={false}
        ></iframe>
        <iframe
          className="mx-auto overflow-hidden 2xl:hidden"
          src="https://player.twitch.tv/?video=1922395449&parent=fusionclips.pro"
          width="300"
          height="169"
          allowFullScreen={false}
        ></iframe>
      </div>
      <div className="2xl:flex 2xl:items-center 2xl:text-2xl 2xl:text-start text-base text-center">
        <div className="flex flex-col mx-auto">
          <p><span className="font-bold">Section: </span>{`${Math.floor(time_stamp / 3600) == 0 ? "" : Math.floor(time_stamp / 3600) + ':'}${Math.floor((time_stamp % 3600) / 60)}:${time_stamp % 60} - ${Math.floor((time_stamp + 60) / 3600) == 0 ? "" : Math.floor((time_stamp + 60) / 3600)}${Math.floor(((time_stamp + 60) % 3600) / 60)}:${(time_stamp + 60) % 60}`}</p>
          <p><span className="font-bold text-primary_pink">Engagement Rate: </span>{(f_score * 100) == 100 ? (f_score * 100) : (f_score * 100).toFixed(1)}%</p>
        </div>
        <div className="flex flex-col w-fit mx-auto text-3xl">
          <Button variant="link">
            <a target="_blank" href={twitch_url + `?t=${time_stamp}s`} >Watch on Twitch</a>
          </Button>
          <Button onClick={handleDownload} disabled={downloading}>Download Clip</Button>
        </div>
      </div>
      {
        downloading ?
          <Alert className="w-fit flex flex-col gap-3 fixed bottom-0 lg:right-0 right-2 m-20 bg-primary-foreground" >
            <AlertTitle>Downloading Clip...</AlertTitle>
            <AlertDescription>
              <p className="mb-2 text-base">{twitch_url + `?t=${time_stamp}s`}</p>
              <Progress value={progress} className="w-full" />
            </AlertDescription>
          </Alert>
          :
          ""
      }
    </div>
  )
}