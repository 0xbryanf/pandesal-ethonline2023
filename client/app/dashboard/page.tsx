'use client'
import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Account from '../components/Account';
import NetworkCard from '../components/NetworkCard';

export default function Dashboard() {
  const [network, setNetwork] = useState('5');

  const handleChange = (event: React.SyntheticEvent, newNetwork: string) => {
    setNetwork(newNetwork);
  }


  return (
    <div className="flex box-border flex-col px-4 lg:px-24 py-12 gap-8">
      <h1 className='text-3xl'>Welcome to your dashboard!</h1>
      {/* Personal Information */}
        <h2 className='text-2xl'>🍞 Create Your Account</h2>
        <Account networkId={network} />

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
        <NetworkCard networkId={network} key={network} />

    </div>
  )
}