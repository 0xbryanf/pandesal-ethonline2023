import React from 'react'
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';

const NetworkCard = ({network, status}) => {

  return (
    <Card variant='outlined' sx={{ minWidth: 250 }}>
    <CardContent>
      <h2 className="text-xl">{network}</h2>
        {status ? (
          <p className='text-gray-500 text-sm py-2'>
            Deployed! 🎉
          </p>
          ) : (
          <>
            <p className='text-gray-500 text-sm py-2'>
              Not yet deployed.
            </p>
            <button className='border border-pandesal-blue rounded p-2'>Deploy now</button>
          </>
        )}
    </CardContent>
  </Card>
  )
}

export default NetworkCard