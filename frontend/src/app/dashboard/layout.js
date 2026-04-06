'use client';
import Sidebar from '@/components/Sidebar'
import { AuthContext } from '@/context/AuthProvider';
import { useRouter } from 'next/navigation';
import Router from 'next/router';
import React, { useContext, useEffect } from 'react'

export default function layout({children}) {
  const {user,loading} =useContext(AuthContext)
  const router=useRouter()
   useEffect(()=>{
      if(!user&&!loading)router.push("/login");
    },[user,loading])
  return (
    <div className='flex h-screen overflow-hidden'>
        <Sidebar/>
        <div className='flex-1 overflow-y-auto'>
            {children}
        </div>
    </div>
  )
}
