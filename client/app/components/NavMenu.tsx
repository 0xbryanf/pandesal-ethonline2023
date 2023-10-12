'use client'
import React, { useState } from 'react'
import SubjectIcon from '@mui/icons-material/Subject';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';

const NavMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (event) => {
    setAnchorEl(null)
  }

  return (
    <div>
      <SubjectIcon onClick={handleOpen} className='hover:cursor-pointer'/>
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
          horizontal: 'left',
        }}
        className='my-2'
      >
        <MenuItem onClick={handleClose}>
          <Link href='/dashboard'>
            My Dashboard
          </Link>
            
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href='/about'>
            About Us
          </Link>
        </MenuItem>
      </Menu>
    </div>
  )
}

export default NavMenu