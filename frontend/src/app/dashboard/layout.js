'use client';
import Sidebar from '@/components/Sidebar'
import { AuthContext } from '@/context/AuthProvider';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react'

export default function layout({children}) {
  const {user,loading} =useContext(AuthContext)
  const router=useRouter()
   useEffect(()=>{
      if(!user&&!loading)router.push("/login");
    },[user,loading])
  return (
  <div className='flex h-[calc(100vh-3.5rem)] overflow-hidden'>
    <Sidebar />
    <div className='flex-1 overflow-y-auto min-w-0'>
      {children}
    </div>
  </div>
)
}
