
"use client"
import axios from 'axios';
import { useState, useEffect } from 'react';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';

export default function Account() {
  const [email, setEmail] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [contract, setContract] = useState(null);

  async function action() {
    try {
      const response = await axios("http://localhost:1989/api/services/oauth/get-account");
      
      if (response.data) {
        setEmail(response.data.email);
        setWallet(response.data.wallet);
        setContract(response.data.contract);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    action();
  }, []);

  return (
    <div className="flex flex-row overflow-x-auto gap-4 mb-4">
      <Card variant='outlined' sx={{ minWidth: 250 }}>
        <CardContent>
          <h2 className="text-xl">Email Address:</h2>
          <p className='text-gray-500 text-xs py-2'>{email}</p>
        </CardContent>
      </Card>
      
      <Card variant='outlined' sx={{ minWidth: 250, width: 'max-content' }}>
        <CardContent>
          <h2 className="text-xl">Wallet Address:</h2>
          <p className='text-gray-500 text-xs py-2'>{wallet}</p>
        </CardContent>
      </Card>
      
      <Card variant='outlined' sx={{ minWidth: 250, width: 'max-content' }}>
        <CardContent>
          <h2 className="text-xl">Smart Account:</h2>
          <p className='text-gray-500 text-xs py-2'>{contract}</p>
        </CardContent>
      </Card>
    </div>
  );
}