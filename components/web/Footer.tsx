import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (

    <footer className="mt-32 w-full rounded-lg shadow my-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <Link href="/" className='flex items-center hover:text-prime_light'>
              <Image src="/fclogo.png" width="50" height="50" alt='logo' />
              <h1 className='text-xl font-extrabold'>Fusion Clips AI</h1>
            </Link>
            <Link href="https://www.producthunt.com/posts/fusionclips?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-fusionclips" target="_blank"><Image src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=410171&theme=dark" alt="FusionClips - Turn&#0032;long&#0032;content&#0032;into&#0032;engaging&#0032;clips | Product Hunt" width="250" height="54" /></Link>
          </div>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link href="/privacy" className="mr-4 hover:underline md:mr-6">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms" className="mr-4 hover:underline md:mr-6 ">Terms & Conditions</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">Contact</Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 FusionClips. All Rights Reserved.</span>
      </div>
    </footer>


  )
}