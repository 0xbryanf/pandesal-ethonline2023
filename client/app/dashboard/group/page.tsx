'use client'
import { useSearchParams } from 'next/navigation';
import { CardContent } from '@mui/material';
import Card from '@mui/material/Card';
import { useEffect, useState } from 'react';

export default function GroupPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('Lorem, ipsum dolor.');
  const [poolAmount, setPoolAmount] = useState(0);
  const [ongoingLoans, setOngoingLoans] = useState([]);

  const searchParams = useSearchParams();

  useEffect(() => {
    const findName = searchParams.get('name');
    setName(findName);
    
    /**
     * @todo: add setting of description, pool amount and ongoing loans in this group
     * @todo: replace search params from name to group ID
     * @todo: add validation if user is a member of this group, else cannot access
     */
  }, [])
  

  return (
    <div className="flex box-border flex-col px-24 py-8 bg-pandesal-grey/20 gap-8">

      {/* Personal Information */}
        <h1 className='text-3xl'>{name}</h1>
        
        <div className="grid grid-cols-2 gap-8">

          <div>
            <Card variant='outlined' sx={{ minWidth: 250 }}>
              <CardContent>
                <h2 className="text-xl">Description</h2>
                <p className='text-gray-500 text-sm py-2'>{description}</p>
              </CardContent>
            </Card>

            
          </div>

          <div className='flex flex-col gap-8'>
            <Card variant='outlined' sx={{ minWidth: 250 }}>
              <CardContent>
                <h2 className="text-xl">Current Pool:</h2>
                <p className='text-gray-500 text-3xl py-2'>{poolAmount} ETH</p>
                <button className='border border-pandesal-blue rounded p-2'>Loan</button>
              </CardContent>
            </Card>
            <Card variant='outlined' sx={{ minWidth: 250 }}>
              <CardContent>
                <h2 className="text-xl">Ongoing Loans</h2>
                <ul className='text-gray-500 text-sm py-2'>
                  {ongoingLoans?.length > 0 ? (
                    <p>Loan info here</p>
                  ) : (
                    <p>No ongoing loans</p>
                  )}
                </ul>
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