import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Link from 'next/link';
import Account from '../components/Account';
import NetworkCard from '../components/NetworkCard';
import GroupCard from '../components/GroupCard';

export default function Page() {
  return (
    <div className="flex min-h-full box-border flex-col px-24 py-8 bg-pandesal-grey/20 gap-8">

      {/* Personal Information */}
        <h1 className='text-3xl'>Your Account</h1>
        <Account/>

      {/* Network Information */}
        <h1 className='text-3xl'>Deploy Your Account</h1>
        <div className="flex flex-row gap-4 mb-4">
          <NetworkCard network='Goerli' status={true} />
          <NetworkCard network='Sepolia' status={false} />
          <NetworkCard network='Polygon Mumbai' status={false} />
          <NetworkCard network='Scroll' status={true} />

          {/* <Card variant='outlined' sx={{ minWidth: 250 }}>
            <CardContent>
              <h2 className="text-xl">Goerli</h2>
              <p className='text-gray-500 text-sm py-2'>Deployed!</p>
            </CardContent>
          </Card>

          <Card variant='outlined' sx={{ minWidth: 250 }}>
            <CardContent>
              <h2 className="text-xl">Sepolia</h2>
              <p className='text-gray-500 text-sm py-2'>Inactive. Deploy now!</p>
            </CardContent>
          </Card>

          <Card variant='outlined' sx={{ minWidth: 250 }}>
            <CardContent>
              <h2 className="text-xl">Polygon Mumbai</h2>
              <p className='text-gray-500 text-sm py-2'>Inactive. Deploy now!</p>
            </CardContent>
          </Card>

          <Card variant='outlined' sx={{ minWidth: 250 }}>
            <CardContent>
              <h2 className="text-xl">Scroll</h2>
              <p className='text-gray-500 text-sm py-2'>Deployed!</p>
            </CardContent>
          </Card> */}

        </div>

      {/* Group Information */}
        <h1 className='text-3xl'>Create or Join a Group</h1>
        <div className="flex flex-row gap-4 mb-4">
          <GroupCard name='Pandesal Jam' description='Lorem, ipsum dolor.' />


        </div>
    </div>
  )
}