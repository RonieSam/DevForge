'use client';
import React, { useContext } from 'react'
import Link from 'next/link'
import { AuthContext } from '@/context/AuthContext'
export default function Navbar() {

  const {user}=useContext(AuthContext)

  return (
    <div className='flex justify-between items-center sticky top-0 z-50 border-b h-15'>
      <div className='border' >
          <Link href={"/"}>Devforge</Link>
      </div>
      <div className='flex justify-between border'>
          {user==null && <div><Link href={"/login"}> Login </Link> <Link href={"/signup"}>SignUp</Link></div> }
          {user!=null && <div><div className='m-2'> {user.firstName} </div></div> }
      </div>
    </div>

  )
}
