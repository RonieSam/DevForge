'use client';

import AuthProvider, { AuthContext } from '@/context/AuthProvider'
import React, { useContext } from 'react'
import { ThreeDot } from 'react-loading-indicators';

export default function MainComponent({children}) {
    const {loading}=useContext(AuthContext)

  return (
    <>
      {loading && (
        <div className='flex flex-1 justify-center items-center'>
          <ThreeDot color={"blue"}/>
        </div>
      )}
      {!loading && (
        <main className="flex-1 flex flex-col min-h-0">
          {children}
        </main>
      )}
    </>
  )
}
