import Image from 'next/image'

export default function About() {
  return (
    <div className='flex min-h-screen box-border flex-col px-8 md:px-24 py-8 bg-pandesal-grey/20 gap-4'>
      <h1 className='text-3xl'>About Pandesal</h1>
      <Image 
        src='/images/hero-bg.png' 
        alt={''}
        width={1280}
        height={250}
        className='self-center'
        />
      <h1 className="text-2xl">
        Explore Web3's Potential with Ease
      </h1>
      <p className='text-xl italic'>
          Discover a seamless gateway to the decentralized world, even if you're new to blockchain. 
      </p>
      <p>
          Our easy-start solution empowers Web2 users to access Web3 apps effortlessly. No more fumbling with private keys or lengthy registrations.
        </p>
        <p>
          Whether you're an individual looking to explore the limitless possibilities of the blockchain or a Web3 business aiming to welcome Web2 users into your ecosystem, our solution is your bridge to a frictionless Web3 experience.
        </p>
        <p className='bold'>
          Embrace the future without the fuss – it's time to simplify Web3 onboarding.
        </p>
        <p className="">
          With just your Google authentication, you can instantly have your own blockchain address.
          </p>
        <p className=''>
          Save the complex wallet setups and crypto jargon for later. Join the blockchain revolution instantly.
        </p>
      
    </div>
  )
}
