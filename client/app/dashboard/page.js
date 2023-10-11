import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex min-h-full box-border flex-col px-24 py-8 bg-pandesal-grey/20 gap-8">

      {/* Personal Information */}
        <h1 className='text-3xl'>Personal Information</h1>
        <div className="flex flex-row gap-4 mb-4">

          <Card variant='outlined' sx={{ minWidth: 250 }}>
            <CardContent>
              <h2 className="text-xl">Email Address</h2>
              <p className='text-gray-500 text-sm py-2'>lorem@ipsumdolor.com</p>
            </CardContent>
          </Card>

          <Card variant='outlined' sx={{ minWidth: 250 }}>
            <CardContent>
              <h2 className="text-xl">Contract Address</h2>
              <p className='text-gray-500 text-sm py-2'>0xA1B2c3d4E5f6g7h9i0j1k22340</p>
            </CardContent>
          </Card>

          <Card variant='outlined' sx={{ minWidth: 250 }}>
            <CardContent>
              <h2 className="text-xl">Wallet Address</h2>
              <p className='text-gray-500 text-sm py-2'>0xA1B2c3d4E5f6g7h9i0j1k22340</p>
            </CardContent>
          </Card>

        </div>

      {/* Network Information */}
        <h1 className='text-3xl'>Network Information</h1>
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
        <h1 className='text-3xl'>Groups Joined</h1>
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