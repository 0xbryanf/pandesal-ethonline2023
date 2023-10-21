'use client'
import googleOauth from '@/utils/googleOauth';
import { TypeAnimation } from 'react-type-animation';

export default function MyComponent() {

  return (
      <a className='bg-[#E9E1F8] rounded rounded-lg px-6 py-2 shadow-sm hover:shadow-md duration-100 text-xl text-black/80 font-semibold' href={googleOauth()}>
        <TypeAnimation
          sequence={[
            'Log In to Pandesal',
            1500,
            'Log In to ETH Global',
            1500,
            'Log In to <Your_Company_Here>',
            3500
          ]}
          wrapper='span'
          speed={60}
          repeat={Infinity}
          cursor={false}
          />
      </a>
  );
}
