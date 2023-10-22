'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Account from '../components/Account';
import NetworkCard from '../components/NetworkCard';
import { useUser } from "../context/LogInContext";

export default function Dashboard() {
  const { signIn } = useUser();
  const [email, setEmail] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [contract, setContract] = useState(null);
  const [privateKey, setPrivateKey] = useState('Private key will be shown here');
  const [walletBalance, setWalletBalance] = useState(0);
  const [contractBalance, setContractBalance] = useState(0);

  const [network, setNetwork] = useState('5');

  const handleChange = (event: React.SyntheticEvent, newNetwork: string) => {
    setNetwork(newNetwork);
  }

  async function action() {
    try {
      const response = await axios("http://localhost:1989/api/services/oauth/get-account");
      
      if (response.data) {
        console.log('Getting account', response.data)
        setEmail(response.data.email);
        setWallet(response.data.wallet);
        setContract(response.data.contract);
        signIn();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  async function getContractBalance () {
      try {
        const networkId = network;
        const data = {
          address: contract,
          network: networkId,
        }
        console.log('Checking network balance', data);
        
        const response = await axios.post("http://localhost:1989/api/etherscan/get-ethbalance-single-address", data)
        
        console.log('Network balance response:', response.data);
        
      } catch (error) {
        console.error("Error:", error)
      }
    }
    
    useEffect(() => {
      action();
    }, []);

    useEffect(() => {
        getContractBalance();
      }, [network, contract])
      
      
  return (
    <div className="flex box-border flex-col px-4 lg:px-24 py-12 gap-8">
      <h1 className='text-3xl'>Welcome to your dashboard!</h1>
      {/* Personal Information */}
        <h2 className='text-2xl'>🍞 Create Your Account</h2>
        <Account
          networkId={network} 
          email={email}
          wallet={wallet}
          contract={contract}
          />

      {/* Network Information */}
        <h2 className='text-2xl'>🚀 Deploy Your Account</h2>
        <Box sx={{ width: '100% '}}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={network} onChange={handleChange} aria-label="Network Switcher">
              <Tab label="Goerli" value='5' key='5' />
              <Tab label="Sepolia" value='11155111' />
              <Tab label="Polygon" value='80001' />
              <Tab label="Scroll" value='534351' />
            </Tabs>
          </Box>
        </Box>
        <NetworkCard networkId={network} key={network} contractAddress={contract} />

    </div>
  )
}