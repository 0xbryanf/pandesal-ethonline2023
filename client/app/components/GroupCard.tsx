import React from 'react'
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Link from 'next/link';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

const GroupCard = ({name, description}) => {
  return (
    <Card variant='outlined' sx={{ minWidth: 250 }}>
    <CardContent>
      <h2 className="text-xl flex justify-between items-center">
        {name}
        <Link href="/dashboard/group" className='underline'><ArrowOutwardIcon/> </Link>
      </h2>
      <p className='text-gray-500 text-sm py-2'>{description}</p>
    </CardContent>
  </Card>
  )
}

export default GroupCard