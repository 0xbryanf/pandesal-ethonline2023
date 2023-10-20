'use client'
import React, { useState } from "react";

interface IConfirmProps {
  confirming: boolean;
  setConfirming: React.Dispatch<React.SetStateAction<boolean>>;
}


const SignMessage: React.FC<IConfirmProps> = ({confirming, setConfirming}): JSX.Element => {
  const [loading, setLoading] = useState(false);

  const confirm = () => {
    console.log('Message signed');
    setConfirming(false);
  }

  const cancel = () => {
    console.log('Transaction denied');
    setConfirming(false);
  }

  return (
    <div className='fixed top-10 place-self-center z-999 bg-white w-96 h-max-content p-4 border border-gray-200 rounded shadow-xl flex flex-col items-center gap-2 text-center'>
      <p className='text-xl'>Confirm this transaction?</p>
      <p className='text-xs p-4'>By clicking confirm, you are signing a message to the network with your address. Learn more about signing messages in our Web3 learning modules.</p>

      <div className='flex justify-center gap-2'>
        <button className={`border border-pandesal-blue text-white bg-pandesal-blue duration-100 text-xs rounded p-2 ${!loading && 'hover:bg-pandesal-blue/70 hover:text-white'}`} disabled={loading ? true : false} onClick={confirm}>{!loading ? 'Confirm' : 'Loading...'}</button>
        <button className={`border border-black text-black duration-100 text-xs rounded p-2 ${!loading && 'hover:bg-pandesal-orange hover:text-white'}`} disabled={loading ? true : false} onClick={cancel}>Cancel</button>

      </div>
    </div>
  )
}

export default SignMessage;