import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Link from 'next/link';
import Account from '../components/Account';
import NetworkCard from '../components/NetworkCard';
import GroupCard from '../components/GroupCard';

export default function Dashboard() {
  return (
    <div className="flex box-border flex-col px-24 py-8 bg-pandesal-grey/20 gap-8">

      {/* Personal Information */}
        <h1 className='text-3xl'>1. Create Your Account</h1>
        <Account/>

      {/* Network Information */}
        <h1 className='text-3xl'>2. Deploy Your Account</h1>
        <div className="flex flex-row gap-4 mb-4">
          <NetworkCard network='Goerli' />
          <NetworkCard network='Sepolia'  />
          <NetworkCard network='Polygon Mumbai' />
          <NetworkCard network='Scroll' />
        </div>

      {/* Group Information */}
        <h1 className='text-3xl'>3. Create or Join a Group</h1>
        <div className="flex flex-row gap-4 mb-4">

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