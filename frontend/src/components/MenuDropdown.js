import { AuthContext } from '@/context/AuthProvider'
import Link from 'next/link'
import React, { useContext } from 'react'

export default function MenuDropdown() {
  const { logoutUser } = useContext(AuthContext)

  return (
    <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 absolute right-0 top-12 w-40 bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      
      <Link
        href={"/login"}
        onClick={() => logoutUser()}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Logout
      </Link>

      <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
        Profile
      </div>

    </div>
  )
}