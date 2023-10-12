import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import Link from 'next/link';
import Account from '@/app/components/Account';

export default function Dashboard() {
  return (
    <div className="flex min-h-full box-border flex-col px-24 py-8 bg-pandesal-grey/20 gap-8">
      <h1 className='text-3xl'>1. Create your account</h1>
      <Account />
      
      {/* Network Information */}
        <h1 className='text-3xl'>2. Deploy your account</h1>
        <div className="flex flex-row gap-4 mb-4">

          <Card variant='outlined' sx={{ minWidth: 250 }}>
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
          </Card>

        </div>

      {/* Group Information */}
        <h1 className='text-3xl'>3. Start or join a group </h1>
        <div className="flex flex-row gap-4 mb-4">

          <Card variant='outlined' sx={{ minWidth: 250 }}>
            <CardContent>
              <h2 className="text-xl flex justify-between items-center">
                Pandesal Jam
                <Link href="/dashboard/group" className='underline'><ArrowOutwardIcon/></Link>
              </h2>
              <p className='text-gray-500 text-sm py-2'>Lorem, ipsum dolor.</p>
            </CardContent>
          </Card>

        </div>
    </div>
  )
}