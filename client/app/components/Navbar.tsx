import Link from "next/link"
import NavMenu from "@/app/components/NavMenu"

export default function Navbar() {
  return (
    <nav className='flex flex-row px-6 py-3 justify-between items-center w-full'>
      <div className='flex gap-3'>
        <NavMenu/>
        <Link href="/" className='text-pandesal-orange uppercase font-bold'>Pandesal</Link>
      </div>
      {/* <div>NavCenter</div> */}
      <div className='flex gap-4'>
        <button>Log In</button>
        <button className='rounded px-3 py-1 border border-pandesal-orange text-pandesal-orange'>Sign Up</button>
      </div>
    </nav>
  )
}
