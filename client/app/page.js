import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex min-h-full flex-col md:flex-row p-24 bg-pandesal-blue text-white gap-8">
      {/* Left Section */}
      <div className='flex flex-col w-1/2'>
        <h1 className="text-6xl">
          Frictionless onboarding, a friends-only central bank
        </h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum delectus nemo commodi accusantium ipsum optio quod quisquam doloribus natus recusandae eaque, minus laboriosam officiis omnis dolorum dolore blanditiis nam! Asperiores expedita facilis, provident cum minus eligendi!
        </p>

      </div>

      {/* Right Section */}
      <div className="flex flex-col w-1/2 items-center text-center gap-2 justify-center bg-white rounded border-2 border-black shadow-md">
        <button className='bg-pandesal-orange rounded px-6 py-1 hover:shadow-md text-xl'>Sign Up With Google</button>
        <p className="text-black">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
    </div>
  )
}
