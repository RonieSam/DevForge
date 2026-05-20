import { AuthContext } from '@/context/AuthProvider'
import Link from 'next/link'
import React, { useContext } from 'react'

export default function MenuDropdown() {
  const { logoutUser } = useContext(AuthContext)

  return (
    <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 absolute right-0 top-11 w-40 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
      
      <Link
        href={"/login"}
        onClick={() => logoutUser()}
        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
      >
        Logout
      </Link>

      <div className="border-t border-gray-100"></div>

      <div className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition">
        Profile
      </div>
    </div>
  )
}