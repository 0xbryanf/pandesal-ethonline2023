import googleOauth from '@/utils/googleOauth';
import Image from 'next/image'

export default function Home() {
  return (
    <div
      className="flex min-h-screen box-border p-4 flex-col-reverse justify-center
      lg:flex-row md:items-center md:px-20 bg-pandesal-blue text-white gap-8"
      style={{
        backgroundImage: `radial-gradient(650px circle at 0% 0%,
          hsl(210, 50%, 57%) 15%,
          hsl(210, 41%, 50%) 35%,
          hsl(210, 41%, 40%) 75%,
          hsl(210, 41%, 39%) 80%,
          transparent 100%),
        radial-gradient(1250px circle at 100% 100%,
          hsl(210, 50%, 65%) 15%,
          hsl(210, 41%, 50%) 35%,
          hsl(210, 41%, 40%) 75%,
          hsl(210, 41%, 39%) 80%,
          transparent 100%)`,
      }}
      >

      {/* Left Section */}
      <div className='flex flex-col lg:w-1/2 gap-4 p-4'>
        <h1 className="text-3xl md:text-5xl">
          Explore Web3's Potential with Ease
        </h1>
        <p className='text-xl'>
          Discover a seamless gateway to the decentralized world, even if you're new to blockchain. 
        </p>
        <p className='hidden md:block'>
          Whether you're an individual looking to explore the limitless possibilities of the blockchain or a Web3 business aiming to welcome Web2 users into your ecosystem, our solution is your bridge to a frictionless Web3 experience.
        </p>
        <p className='italic'>
          Embrace the future without the fuss – it's time to simplify Web3 onboarding.
        </p>

      </div>

      {/* Right Section */}
      <div className="flex h-full flex-col w-full lg:w-1/2 items-center text-center gap-4 p-8 justify-center bg-white/90 rounded shadow-lg" style={{
        backgroundImage: `url('/images/hero-image.png')`,
        backgroundSize: 'cover',
        backgroundPosition: '50%',
        backgroundBlendMode: 'screen'
      }}>
        <p className="text-black hidden md:block">
          With just your Google authentication, you can instantly have your own blockchain address.
          </p>
        <p className='text-black'>
          Save the complex wallet setups and crypto jargon for later. Join the blockchain revolution instantly.
        </p>
        <a className='bg-pandesal-orange rounded px-6 py-1 hover:shadow-md duration-100 text-xl' href={googleOauth()}>Sign Up With Google</a>
      </div>
    </div>
  )
}
