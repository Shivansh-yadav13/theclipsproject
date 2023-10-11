import Image from "next/image";
import Link from "next/link";


export default function Clips() {
  return (
    <div className="mt-60">
      <h1 className="text-6xl text-center uppercase font-bold my-32">Choose Your <span className="text-primary_pink">Streaming</span> Platform</h1>
      <div className="flex justify-center items-center">
        <div className="flex justify-center items-center gap-72 w-full overflow-x-scroll scale-150 my-auto">
          <Link href="/clips/twitch">
            <Image src="/twitch_logo_white.png" className="grayscale hover:grayscale-0 hover:opacity-100 opacity-60 transform duration-300" alt="twitch" width={150} height={100} />
          </Link>
          {/* <Image src="/youtube_logo.png" className="grayscale hover:grayscale-0 hover:opacity-100 opacity-90 transform duration-300" alt="youtube" width={150} height={250} /> */}
          <Link href="/clips/kick">
            <Image src="/kick_logo.png" className="grayscale hover:grayscale-0 hover:opacity-100 opacity-90 transform duration-300" alt="kick" width={130} height={1} />
          </Link>
        </div>
      </div>
    </div>
  )
}