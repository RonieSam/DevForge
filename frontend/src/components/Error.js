import { AuthContext } from '@/context/AuthProvider'
import React, { useContext } from 'react'

export function AuthError() {
    const {loginAuthError}=useContext(AuthContext)
  return (
    <div className='flex items-center justify-center bg-red-50 border border-red-200 rounded-lg mx-2 my-2 px-4 py-2.5 text-sm text-red-600'>
      ⚠︎ {loginAuthError}
    </div>
  )
}