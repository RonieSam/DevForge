'use client';

import { AuthContext } from '@/context/AuthProvider'
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react'
import { ThreeDot } from 'react-loading-indicators';

export default function Dashboard() {
    const router=useRouter();
    const {user,loading} =useContext(AuthContext)

    useEffect(()=>{
      if(!user&&!loading)router.push("/");
    },[user,loading])
  return (
    <div>
    {loading && <ThreeDot color={"blue"}/>}
    {loading && <div>Welcome {user.firstName}</div>}
    </div>
  )
}
