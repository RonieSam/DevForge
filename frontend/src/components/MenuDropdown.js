import { AuthContext } from '@/context/AuthProvider'
import Link from 'next/link'
import React, { useContext } from 'react'

export default function MenuDropdown() {
    const {logoutUser}=useContext(AuthContext)
  return (
    <div className='invisible opacity-0 group-hover:visible group-hover:opacity-100 duration-200 m-2 flex flex-col justify-within  border absolute top-13 right-1 '>
        <Link className='border w-full pr-5 pl-5' href={"/login"} onClick={()=>logoutUser()}>Logout</Link>
        <div className='border w-full pr-5 pl-5'>Profile</div>
    </div>
  )
}
