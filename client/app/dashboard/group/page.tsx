import { CardContent } from '@mui/material';
import Card from '@mui/material/Card';

export default function Group() {
  return (
    <div className="flex min-h-full box-border flex-col px-24 py-8 bg-pandesal-grey/20 gap-8">

      {/* Personal Information */}
        <h1 className='text-3xl'>Group Name</h1>
        
        <div className="flex flex-row gap-8">

          <div>
            <Card variant='outlined' sx={{ minWidth: 250 }}>
              <CardContent>
                <h2 className="text-xl">Members</h2>
                <p className='text-gray-500 text-sm py-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </CardContent>
            </Card>
          </div>

          <div className='flex flex-col gap-8'>
            <Card variant='outlined' sx={{ minWidth: 250 }}>
              <CardContent>
                <h2 className="text-xl">Current Pool:</h2>
                <p className='text-gray-500 text-3xl py-2'>19.21 ETH</p>
                <button className='border border-pandesal-blue rounded p-2'>Loan</button>
              </CardContent>
            </Card>
            <Card variant='outlined' sx={{ minWidth: 250 }}>
              <CardContent>
                <h2 className="text-xl">Ongoing Loans</h2>
                <p className='text-gray-500 text-sm py-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </CardContent>
            </Card>
          </div>


        </div>

        {/* <div className="flex flex-row gap-4 mb-4">

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

        </div> */}
    </div>
  )
}