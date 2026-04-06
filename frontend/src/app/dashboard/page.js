'use client';

import { AuthContext } from '@/context/AuthProvider'
import React, { useContext, useEffect } from 'react'
import { ThreeDot } from 'react-loading-indicators';

export default function Dashboard() {
    const {loading} =useContext(AuthContext)
  return (
    <div>
    {loading && <ThreeDot color={"blue"}/>}
    {!loading && <div>{[...Array(50)].map((_, i) => (
        <div key={i}>Item {i}</div>
      ))}</div>}
    </div>
  )
}
