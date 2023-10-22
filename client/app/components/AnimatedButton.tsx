'use client'
import googleOauth from '@/utils/googleOauth';
import { TypeAnimation } from 'react-type-animation';

export default function MyComponent() {

  return (
      <a className='inline-flex justify-center bg-pink-600 items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-gray-300 hover:bg-rose-600 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800' href={googleOauth()}>
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
