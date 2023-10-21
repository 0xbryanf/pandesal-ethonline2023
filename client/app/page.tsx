import AnimatedButton from './components/AnimatedButton';

export default function Home() {

  return (
    <div className="flex min-h-screen box-border p-4 flex-col justify-center lg:flex-row md:items-center md:px-20 gap-8">

      <div className='flex flex-col items-start lg:w-1/2 gap-4 p-4'>
        <h1 className="text-3xl md:text-5xl font-bold">
          Web3 Onboarding With Ease
        </h1>
        <p>
          Embrace the future without the fuss. Let <b>your users</b> join the blockchain revolution instantly. 
        </p>

        <AnimatedButton/>
      </div>

    </div>
  )
}
