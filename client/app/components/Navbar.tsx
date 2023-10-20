'use client'

import React, { useState } from 'react'
import NavMenu from './NavMenu';
import Link from 'next/link';
import googleOauth from '@/utils/googleOauth';
import { useUser } from "../context/LogInContext";

const NavBar = () => {
  const { isUserSignedIn, signIn, signOut } = useUser();

  const handleSignIn = () => {
    googleOauth();
    signIn();
  }

  return (
    <nav className='flex flex-row px-6 py-3 justify-between items-center w-full'>
      <div className='flex gap-3'>
        <Link href="/" className='text-pandesal-orange uppercase font-bold'>Pandesal</Link>
      </div>
      {/* <div>NavCenter</div> */}
      <div className='flex gap-4'>
        {isUserSignedIn ? ( 
            <NavMenu/>
          ) : (
          <button className='rounded px-3 py-1 border border-pandesal-orange text-pandesal-orange hover:text-white hover:bg-pandesal-orange/80 duration-100' onClick={handleSignIn}>
              Log In
          </button>
          )
        }
      </div>
    </nav>
  )
}

export default NavBar