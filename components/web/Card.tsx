import Image from "next/image";

export default function Card({ title, emo, desc, tag }: { title: string, emo: string, desc: string, tag?: string }) {
  return (
    <div className='w-fit flex sm:my-10'>
      <div className="flex justify-start gap-2">
        <h1 className="text-4xl">{emo}</h1>
      </div>
      <div className="">
        <h1 className="font-bold text-2xl flex items-center">
          {title}
          {
            tag ?
              <div className="w-fit border border-purple-400 bg-purple-50 rounded-md py-0.5 px-2 mx-2">
                <p className="text-sm font-normal">{tag}</p>
              </div>
              :
              ""
          }
        </h1>
        <p className="text-light font-semibold">{desc}</p>
      </div>
    </div>
  );
}
