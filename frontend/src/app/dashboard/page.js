'use client';

import TasksContainer from '@/components/TasksContainer';
import { AuthContext } from '@/context/AuthProvider'
import React, { useContext, useEffect } from 'react'
import { ThreeDot } from 'react-loading-indicators';

export default function Dashboard() {
    const {loading} =useContext(AuthContext)
  return (
    <div className='flex flex-col  border h-[80%] justify-between'>
      <div className=' border w-full'>hello</div>
      <TasksContainer/>
    </div>
  )
}
