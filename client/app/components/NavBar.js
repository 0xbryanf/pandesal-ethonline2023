import React from 'react'
import SubjectIcon from '@mui/icons-material/Subject';

const NavBar = () => {
  return (
    <nav className='flex flex-row px-6 py-3 justify-between items-center w-full'>
      <div className='flex gap-3'>
        <SubjectIcon/>
        <span className='text-pandesal-orange uppercase font-bold'>Pandesal</span>
      </div>
      {/* <div>NavCenter</div> */}
      <div className='flex gap-4'>
        <button>Log In</button>
        <button className='rounded px-3 py-1 border border-pandesal-orange text-pandesal-orange'>Sign Up</button>
      </div>
    </nav>
  )
}

export default NavBar