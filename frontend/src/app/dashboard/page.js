'use client';

import { AuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react'

export default function() {
    const router=useRouter();
    const {user} =useContext(AuthContext)

    useEffect(()=>{
      if(user==null)router.push("/");
      console.log(user)
    },[])
  return (

    <div>Welcome {user.firstName}</div>
  )
}
