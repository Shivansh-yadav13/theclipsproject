"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSupabase } from '@/app/supabase/supabase-provider';
import { User } from '@supabase/supabase-js';
import { NavDropdown } from './NavDropdown';

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
    <nav>
      <div className='mx-5 lg:hidden z-10'>
        <div className='flex justify-between items-center z-20'>
          <h1 className='font-bold text-2xl'>
            <Link href="/" className='flex items-center hover:text-prime_light'>
              <Image src="/fclogo.png" width="50" height="50" alt='logo' />
              <h1 className='text-xl font-extrabold'>Fusion Clips AI</h1>
            </Link>
          </h1>
          <Image width="30" height="30" className='cursor-pointer' src="/hamburger_white.png" alt="menu--v1" onClick={() => setMenu(!menu)} />
        </div>
        <div className={`absolute z-10 w-full border-x-2 border-b-2 rounded-b-xl backdrop-blur-md p-2 left-0 -top-60 ${menu ? "translate-y-80" : ""} transition-all duration-300`}>
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
            {
              user ?
                <div className='flex items-center gap-2'>
                  <Link href="/profile">Profile</Link>
                  ({user.user_metadata.name.length >= 16 ? `${user.user_metadata.name.substring(0, 15)}...` : `${user.user_metadata.name}`})
                </div>
                :
                <li className='cursor-pointer'>
                  <Link href="/account" className='hover:text-prime_light'>
                    Login/Create Account
                  </Link>
                </li>
            }
            <li className='cursor-pointer'>
              <Link href="/pricing" className='hover:text-prime_light'>
                Pricing
              </Link>
            </li>
            {/* <li className='cursor-pointer'>
              <DiscordBtn />
            </li> */}
          </ul>
        </div>
      </div>
      <div className='hidden mt-5 lg:flex items-center justify-between xl:mx-60 mx-10'>
        <h1 className='font-bold text-2xl'>
          <Link href="/" className='flex items-center hover:text-prime_light'>
            <Image src="/fclogo.png" width="50" height="50" alt='logo' />
            <h1 className='text-xl font-extrabold'>Fusion Clips AI</h1>
          </Link>
        </h1>
        <ul className='flex items-center justify-end gap-10 font-semibold text-sm w-1/2'>
          {
            user ?
            <>
              <NavDropdown user={user} />
            </>
              :
              <li className='cursor-pointer'>
                <Link href="/account" className='hover:text-prime_light'>
                  Login/Create Account
                </Link>
              </li>
          }
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
        </ul>
      </div>
    </nav>
  );
}
