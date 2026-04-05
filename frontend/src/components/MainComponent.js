'use client';

import AuthProvider, { AuthContext } from '@/context/AuthProvider'
import React, { useContext } from 'react'
import { ThreeDot } from 'react-loading-indicators';

export default function MainComponent({children}) {
    const {loading}=useContext(AuthContext)

  return (
    <div className='flex min-h-screen justify-center items-center border'>
        {!loading&&<main className="flex-1">{children}</main>}
        {loading&&<ThreeDot color={"blue"}/>}
    </div>
  )
}
