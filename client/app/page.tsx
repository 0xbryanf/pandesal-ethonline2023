import googleOauth from '@/utils/googleOauth';
import Image from 'next/image'

export default function Home() {

  return (
    <div
      className="flex min-h-screen box-border p-4 flex-col justify-center
      lg:flex-row md:items-center md:px-20 gap-8"
      >

      {/* Left Section */}
      <div className='flex flex-col items-start lg:w-1/2 gap-4 p-4'>
        <h1 className="text-3xl md:text-5xl font-semibold">
          Onboard Your Users With Ease
        </h1>
        {/* <p className='text-xl'>
          Discover a seamless gateway to the decentralized world - to your business ecosystem. 
        </p> */}
        <p className='hidden md:block'>
          {/* Save the complex wallet setups and crypto jargon for later.*/} Let <b>your users</b> join the blockchain revolution instantly. 
        </p>
        <p className='italic'>
          Embrace the future without the fuss – it's time to simplify Web3 onboarding.
        </p>
        <a className='bg-[#E9E1F8] rounded rounded-lg px-6 py-2 hover:shadow-md duration-100 text-xl text-black/80 font-semibold' href={googleOauth()}>
          Sign up with &lt;Your_Company_Here&gt;
        </a>

      </div>

      {/* Right Section */}
      {/* <div className="flex lg:w-1/2 place-content-center">
        <Image
        src='/images/hero-image.png'
        alt=''
        width={500}
        height={500}
        />
      </div> */}
    </div>
  )
}
