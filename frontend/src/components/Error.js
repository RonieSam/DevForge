import { AuthContext } from '@/context/AuthProvider'
import React, { useContext } from 'react'

export function AuthError() {
    const {authError}=useContext(AuthContext)
  return (
    <div className='h-13 flex items-center justify-center bg-red-100 border-2 border-red-700 m-2 text-red-500' >⚠︎ {authError}</div>
  )
}