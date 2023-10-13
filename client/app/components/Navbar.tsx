import React from 'react'
import NavMenu from './NavMenu';
import Link from 'next/link';

const NavBar = () => {
  return (
    <nav className='flex flex-row px-6 py-3 justify-between items-center w-full'>
      <div className='flex gap-3'>
        <NavMenu/>
        <Link href="/" className='text-pandesal-orange uppercase font-bold'>Pandesal</Link>
      </div>
      {/* <div>NavCenter</div> */}
      <div className='flex gap-4'>
        <button className='rounded px-3 py-1 border border-pandesal-orange text-pandesal-orange hover:text-white hover:bg-pandesal-orange/80 duration-100'>
          <Link href='/#signup-form'>
            Log In
          </Link>
        </button>
      </div>
    </nav>
  )
}

export default NavBar