"use client";

import Link from 'next/link';
import Image from 'next/image';
import { redirect } from "next/navigation";
// import DiscordBtn from './DiscordBtn';
import { useEffect, useState } from 'react';
import { useSupabase } from '@/app/supabase/supabase-provider';
import { User } from '@supabase/supabase-js';
// import { Session } from '@supabase/supabase-js';
// import SignOutButton from './Signout';
// import Dropdown from './Dropdown';
// import axios from 'axios';

export default function Navbar() {
  const [menu, setMenu] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { supabase } = useSupabase();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.log(error)
        setUser(null);
      }
      setUser(data.user);
    }
    getUser()
  }, [supabase.auth])


  return (
    <>
      <nav className='mx-5 lg:hidden z-10'>
        <div className='flex justify-between items-center z-20'>
          <h1 className='font-bold text-2xl'>
            <Link href="/" className='flex items-center hover:text-prime_light'>
              <Image src="/fclogo.png" width="50" height="50" alt='logo' />
              <h1 className='text-xl font-extrabold'>Fusion Clips AI</h1>
            </Link>
          </h1>
          <Image width="30" height="30" className='cursor-pointer' src="/hamburger.png" alt="menu--v1" onClick={() => setMenu(!menu)} />
        </div>
        <div className={`absolute z-10 w-full border-x-2 border-b-2 rounded-b-xl p-2 bg-white left-0 -top-60 ${menu ? "translate-y-80" : ""} transition-all duration-300`}>
          <ul className='mx-5 font-semibold text-sm flex flex-col gap-2'>
            <li className='cursor-pointer'>
              <Link href="/#features" className='hover:text-prime_light'>
                Features
              </Link>
            </li>
            <li className='cursor-pointer'>
              <Link href="/pricing" className='hover:text-prime_light'>
                Pricing
              </Link>
            </li>
            {/* {session ?
              <li className='cursor-pointer'>
                <Link href="/profile" className='hover:text-prime_light'>
                  <div className=''>
                    Profile
                  </div>
                </Link>
                <SignOutButton />
              </li>
              :
              <li className='cursor-pointer'>
                <Link href="/account" className='hover:text-prime_light'>
                  Login
                </Link>
              </li>
            } */}
            {/* <li className='cursor-pointer'>
              <DiscordBtn />
            </li> */}
            <li className='text-gray-200 text-xs text-center'>
              <Link target="_blank" href="https://icons8.com/icon/nRgy12QAqQ08/menu">Hamburger</Link> icon by <Link target="_blank" href="https://icons8.com">Icons8</Link>
            </li>
          </ul>
        </div>
      </nav>
      <nav className='hidden mt-5 lg:flex items-center justify-between mx-60'>
        <h1 className='font-bold text-2xl'>
          <Link href="/" className='flex items-center hover:text-prime_light'>
            <Image src="/fclogo.png" width="50" height="50" alt='logo' />
            <h1 className='text-xl font-extrabold'>Fusion Clips AI</h1>
          </Link>
        </h1>
        <ul className='flex items-center justify-end gap-10 font-semibold text-sm w-1/2'>
          <li className='cursor-pointer'>
            <Link href="/#features" className='hover:text-prime_light'>
              Features
            </Link>
          </li>
          <li className='cursor-pointer'>
            <Link href="/pricing" className='hover:text-prime_light'>
              Pricing
            </Link>
          </li>
          {
            user ?
              <div className='flex items-center gap-2'>
                <Image src={user.user_metadata.avatar_url} className='rounded-full' alt='user-profile-picture' width={30} height={30} />
                {user.user_metadata.name.length >= 16 ? `${user.user_metadata.name.substring(0, 15)}...` : `${user.user_metadata.name}`}
              </div>
              :
              <li className='cursor-pointer'>
                <Link href="/account" className='hover:text-prime_light'>
                  Login/Create Account
                </Link>
              </li>
          }
        </ul>
      </nav>
    </>
  );
}
