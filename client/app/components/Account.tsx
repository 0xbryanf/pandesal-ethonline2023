"use client"
import axios from 'axios';
import { useState, useEffect } from 'react';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useUser } from "../context/LogInContext";


export default function Account() {
  const { signIn } = useUser();
  const [email, setEmail] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [contract, setContract] = useState(null);
  const [privateKey, setPrivateKey] = useState(null);
  const [reveal, setReveal] = useState(false);
  
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
    <div className="flex flex-row overflow-x-auto py-2 gap-4 mb-4">
      <Card variant='outlined' sx={{ minWidth: 200, flex: '0 0 auto' }} className='shadow-md'>
        <CardContent>
          <h2 className="text-xl">Email Address</h2>
          <p className={`text-gray-500 text-sm py-2 break-words ${!email && 'italic'}`}>
            {email ? email : 'Fetching...'}
          </p>
        </CardContent>
      </Card>
      
      <Card variant='outlined' sx={{ minWidth: 200, width: 'max-content', flex: 1 }} className='shadow-md'>
        <CardContent>
          <h2 className="text-xl">Wallet Address</h2>
          <p className={`text-gray-500 text-sm py-2 break-words ${!wallet && 'italic'}`}>
            {wallet ? wallet : 'Fetching...'}
          </p>
        </CardContent>
      </Card>
      
      <Card variant='outlined' sx={{ minWidth: 200, width: 'max-content', flex: 1 }} className='shadow-md'>
        <CardContent>
          <h2 className="text-xl">Smart Account</h2>
          <p className={`text-gray-500 text-sm py-2 break-words ${!contract && 'italic'}`}>
            {contract ? contract : 'Fetching...'}
          </p>
        </CardContent>
      </Card>
      
      <Card variant='outlined' sx={{ minWidth: 200, width: 'max-content', flex: 1 }} className='shadow-md'>
        <CardContent>
          <h2 className="text-xl">Private Key</h2>
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
    </div>
  );
}