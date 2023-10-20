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
    console.log(newNetwork);
    setNetwork(newNetwork);
  }


  return (
    <div className="flex box-border flex-col px-4 lg:px-24 py-8 bg-pandesal-grey/20 gap-8">

      {/* Personal Information */}
        <h1 className='text-3xl'>1. Create Your Account</h1>
        <Account/>

      {/* Network Information */}
        <h1 className='text-3xl'>2. Deploy Your Account</h1>
        <Box sx={{ width: '100% '}}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={network} onChange={handleChange} aria-label="Network Switcher">
              <Tab label="Goerli" value='5' />
              <Tab label="Sepolia" value='11155111'  />
              <Tab label="Polygon" value='80001' />
              <Tab label="Scroll" value='534351' />
            </Tabs>
          </Box>
        </Box>
        <NetworkCard networkId={network} />

        {/* <div className="grid grid-cols-2 md:grid-cols-4 justify-items-stretch gap-4 mb-4">
          <NetworkCard networkName='5' />
          <NetworkCard networkName='11155111'  />
          <NetworkCard networkName='80001' />
          <NetworkCard networkName='534351' />
        </div> */}
    </div>
  )
}