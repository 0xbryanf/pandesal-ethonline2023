import googleOauth from '@/utils/googleOauth';
import Image from 'next/image'

export default function Home() {
  return (
    <div
      className="flex h-full box-border flex-col md:flex-row p-24 items-center bg-pandesal-blue text-white gap-8"
      style={{
        backgroundImage: `radial-gradient(650px circle at 0% 0%,
          hsl(218, 41%, 35%) 15%,
          hsl(218, 41%, 30%) 35%,
          hsl(218, 41%, 20%) 75%,
          hsl(218, 41%, 19%) 80%,
          transparent 100%),
        radial-gradient(1250px circle at 100% 100%,
          hsl(218, 41%, 45%) 15%,
          hsl(218, 41%, 30%) 35%,
          hsl(218, 41%, 20%) 75%,
          hsl(218, 41%, 19%) 80%,
          transparent 100%)`
      }}
      >


      {/* Left Section */}
      <div className='flex flex-col w-1/2 gap-2 p-4'>
        <h1 className="text-6xl">
          Frictionless Web3 onboarding, a friends-only central bank
        </h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum delectus nemo commodi accusantium ipsum optio.
        </p>

      </div>

      {/* Right Section */}
      <div className="flex h-full flex-col w-1/2 items-center text-center gap-2 p-4 justify-center bg-white/80 rounded border-2 border-black shadow-md">
        <a className='bg-gray-500 rounded px-6 py-1 hover:shadow-md duration-100 text-xl' href={googleOauth()}>Sign Up With Google</a>
        <p className="text-black">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
    </div>
  )
}
