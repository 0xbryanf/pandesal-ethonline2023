"use client"
import axios from 'axios';
import { useState, useEffect } from 'react';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useUser } from "../context/LogInContext";


export default function Account({ networkId }: any) {
  const { signIn } = useUser();
  const [email, setEmail] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [contract, setContract] = useState(null);
  const [privateKey, setPrivateKey] = useState('Private key will be shown here');
  const [walletBalance, setWalletBalance] = useState(0);
  const [contractBalance, setContractBalance] = useState(0);
  const [reveal, setReveal] = useState(false);

  const networkName = networkId === '5' ? 'Goerli'
  : networkId === '11155111' ? 'Sepolia'
  : networkId === '80001' ? 'Mumbai'
  : 'Scroll'
  
  async function action() {
    try {
      const response = await axios("http://localhost:1989/api/services/oauth/get-account");
      
      if (response.data) {
        setEmail(response.data.email);
        setWallet(response.data.wallet);
        setContract(response.data.contract);
        signIn();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    action();
  }, []);

  const handleReveal = () => {
    setReveal(prev => !reveal);
  }

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 py-2 gap-4 mb-4">
      <Card variant='outlined' sx={{ minWidth: 200, flex: '0 0 auto' }} className='shadow-md col-span-1'>
        <CardContent className='flex flex-col gap-2'>
          <h2 className="text-xl">User Information</h2>
          <p className='grid grid-cols-3 text-sm text-gray-500 gap-2'>
            <span>Email Address:</span>
            <span className={`col-span-2 break-words ${!email && 'italic'}`}>
              {email ? email : 'Fetching...'}
            </span>
          </p>
        </CardContent>
      </Card>
      
      <Card variant='outlined' sx={{ minWidth: 200 }} className='shadow-md'>
        <CardContent className='flex flex-col gap-2'>
          <h2 className="text-xl">Wallet Account</h2>
          <p className='grid grid-cols-4 text-sm text-gray-500 gap-2'>
            <span>Address:</span>
            <span className={`col-span-3 break-words ${!wallet && 'italic'}`}>
              {wallet ? wallet : 'Fetching...'}
            </span>
            <span>Balance:</span>
            <span className='col-span-3 text'>
              {walletBalance} {networkName!== "Mumbai" ? `${networkName}ETH` : 'MATIC'}
            </span>
          </p>
        </CardContent>
      </Card>

      <Card variant='outlined' sx={{ minWidth: 200, flex: 1 }} className='shadow-md'>
        <CardContent>
          <h2 className="text-xl">Private</h2>
          <div className='flex justify-between'>
            <p className={`text-gray-500 text-sm py-2 pr-1 break-words ${!privateKey && 'italic'}`}>
              {!privateKey ? 'Fetching...'
              : !reveal ? 'Click icon to reveal. Do not share this information with anyone.' : privateKey
              }
            </p>
            {reveal ? <VisibilityIcon onClick={handleReveal} /> : <VisibilityOffIcon onClick={handleReveal} /> }

          </div>
        </CardContent>
      </Card>

      <Card variant='outlined' sx={{ minWidth: 200 }} className='shadow-md'>
        <CardContent className='flex flex-col gap-2'>
          <h2 className="text-xl">Smart Account</h2>
          <p className='grid grid-cols-4 text-sm text-gray-500 gap-2'>
            <span>Address:</span>
            <span className={`col-span-3 break-words ${!wallet && 'italic'}`}>
              {contract ? contract : 'Fetching...'}
            </span>
            <span>Balance:</span>
            <span className='col-span-3 text'>
              {contractBalance} {networkName!== "Mumbai" ? `${networkName}ETH` : 'MATIC'}
            </span>
          </p>
        </CardContent>
      </Card>
      

    </div>
  );
}