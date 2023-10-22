import googleOauth from '@/utils/googleOauth';
import Image from 'next/image'

export default function Home() {

  return (
    <section className="dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <div className="inline-flex justify-between items-center py-2 px-2 pr-4 mb-7 text-sm text-gray-700 bg-blue-100 bg-opacity-40 rounded-full dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700" role="alert">
          <span className="text-xs bg-primary-600 rounded-full bg-blue-600 text-white px-4 py-1.5 mr-3">New to Blockchain?</span> <span className="text-sm font-medium">Check this out! Take a byte.</span>
        </div>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-7xl dark:text-white">Simplify Blockchain: Easy Onboarding, Endless Possibilities</h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-lg sm:px-16 xl:px-48 dark:text-gray-400">Our platform is designed to guide everyday users and businesses into a user-friendly web3 experience.</p>
        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <a href={googleOauth()} className="inline-flex justify-center bg-pink-600 items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-gray-300 hover:bg-rose-600 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
            Connect with Pandsal
          </a>
        </div>
        <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-xl lg:px-40">
          <span className="font-semibold text-gray-400 uppercase">FEATURES</span>
          <div className="flex flex-wrap justify-center items-center mt-8 text-gray-500 sm:justify-between">
            <div className="mr-5 mb-5 lg:mb-0 hover:text-rose-600 dark:hover:text-gray-400">
              <h5 className="text-xl cursor-pointer font-extrabold">Walletless Onboarding</h5>
            </div>
            <div className="mr-5 mb-5 lg:mb-0 hover:text-rose-600 dark:hover:text-gray-400">
              <h5 className="text-xl font-extrabold cursor-pointer">Gasless Deployment</h5>
            </div>
            <div className="mr-5 mb-5 lg:mb-0 hover:text-rose-600 dark:hover:text-gray-400">
              <h5 className="text-xl cursor-pointer font-extrabold">Safe Transaction</h5>
            </div>
          </div>
          <div className="flex flex-wrap justify-center items-center mt-8 text-gray-500 sm:justify-between">
            <div className="mr-5 mb-5 lg:mb-0 hover:text-rose-600 dark:hover:text-gray-400">
              <h5 className="text-xl cursor-pointer font-extrabold">Customizable Application</h5>
            </div>
            <div className="mr-5 mb-5 lg:mb-0 hover:text-rose-600 dark:hover:text-gray-400">
              <h5 className="text-xl font-extrabold cursor-pointer">DeFi Ready</h5>
            </div>
            <div className="mr-5 mb-5 lg:mb-0 hover:text-rose-600 dark:hover:text-gray-400">
              <h5 className="text-xl font-extrabold cursor-pointer">Enhanced Privacy</h5>
            </div>
          </div>  
        </div> 
      </div>
    </section>
    // <div classNameName="border border-black flex box-border p-4 flex-col justify-center lg:flex-row md:items-center md:px-20 gap-8">
    //   {/* Left Section */}
    //   <div classNameName='border border-black flex flex-col items-start lg:min-w-full gap-4 p-4'>
    //     <h1 classNameName="text-3xl md:text-5xl font-semibold">
    //       Simplify Blockchain: Easy Onboarding, Endless Possibilities
    //     </h1>
    //     <p classNameName='italic'>
    //       Embrace the future without the fuss – it's time to simplify Web3 onboarding.
    //     </p>
    //     <a classNameName='bg-[#E9E1F8] rounded rounded-lg px-6 py-2 hover:shadow-md duration-100 text-xl text-black/80 font-semibold' href={googleOauth()}>
    //       Log In To &lt;Your_Company_Here&gt;
    //     </a>

    //   </div>

    //   {/* Right Section */}
    //   {/* <div classNameName="flex lg:w-1/2 place-content-center">
    //     <Image
    //     src='/images/hero-image.png'
    //     alt=''
    //     width={500}
    //     height={500}
    //     />
    //   </div> */}
    // </div>
  )
}
