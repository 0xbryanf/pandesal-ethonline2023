'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import NavMenu from './NavMenu';
import Link from 'next/link';
import GitHubIcon from '@mui/icons-material/GitHub';
import googleOauth from '@/utils/googleOauth';
import { useUser } from "../context/LogInContext";

const NavBar = () => {
  const { isUserSignedIn, signIn, signOut } = useUser();
  const router = useRouter();

  const handleSignIn = () => {
    router.push(googleOauth());
  }

  return (
    <nav className='flex flex-row px-6 py-3 justify-between items-center w-full bg-transparent'>
      <div className='flex gap-3'>
        <Link href="/" className='text-2xl uppercase font-bold text-gray-800'><span className='text-rose-700'>P</span>andsal</Link>
      </div>
      {/* <div>NavCenter</div> */}
      <div className='flex gap-4 items-center'>
        <Link href='https://github.com/0xbryanf/pandesal-ethonline2023' target='_blank' className='text-sm'>
            <GitHubIcon/>
        </Link>
        {isUserSignedIn ? ( 
            <NavMenu/>
          ) : (
          <button className='rounded px-3 py-1 border border-pink-600 text-pink-600 hover:text-white hover:bg-pink-500 duration-100' onClick={handleSignIn}>
              Log In
          </button>
          )
        }
      </div>
    </nav>
  )
}

export default NavBar