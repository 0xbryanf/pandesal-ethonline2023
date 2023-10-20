"use client"
import React, { useState } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';

export default function NavMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (event: any) => {
    setAnchorEl(null)
  }

  return (
    <div>
      <AccountCircle onClick={handleOpen} className='hover:cursor-pointer'/>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        className='my-3'
      >
        <MenuItem onClick={handleClose}>
          <Link href='/dashboard'>
            My Dashboard
          </Link>
            
        </MenuItem>
      </Menu>
    </div>
  )
}
