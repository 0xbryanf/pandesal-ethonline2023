import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Link from 'next/link';
import Account from '../components/Account';
import NetworkCard from '../components/NetworkCard';
import GroupCard from '../components/GroupCard';

export default function Dashboard() {
  return (
    <div className="flex box-border flex-col px-4 lg:px-24 py-8 bg-pandesal-grey/20 gap-8">

      {/* Personal Information */}
        <h1 className='text-3xl'>1. Create Your Account</h1>
        <Account/>

      {/* Network Information */}
        <h1 className='text-3xl'>2. Deploy Your Account</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 justify-items-stretch gap-4 mb-4">
          <NetworkCard networkName='5' />
          <NetworkCard networkName='11155111'  />
          <NetworkCard networkName='80001' />
          <NetworkCard networkName='534351' />
        </div>

      {/* Group Information */}
        <h1 className='text-3xl'>3. Create or Join a Group</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 justify-items-stretch gap-4 mb-4">

          {/**
           * @todo: Get user's groups and map, passing only the group ID;
           * name and desc will be fetched within component using ID
          */}

          <GroupCard name='Pandesal Jam' description='Lorem, ipsum dolor.' />
          <GroupCard name='Create New Group' description='' />  {/* Change this element later */}

        </div>
    </div>
  )
}