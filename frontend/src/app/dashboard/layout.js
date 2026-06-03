'use client';
import Sidebar from '@/components/Sidebar'
import { AuthContext } from '@/context/AuthProvider';
import { MobileMenuContext } from '@/context/MobileMenuContext';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react'

export default function layout({children}) {
  const {user,loading} =useContext(AuthContext)
  const router=useRouter()
  const { isSidebarOpen, setIsSidebarOpen } = useContext(MobileMenuContext);

   useEffect(()=>{
      if(!user&&!loading)router.push("/login");
    },[user,loading,router])
    
    
  return (
  <div className='flex h-[calc(100dvh-3.5rem)] overflow-hidden relative w-full'>
    {/* Mobile Overlay */}
    {isSidebarOpen && (
      <div 
        className="fixed inset-0 bg-black/20 z-40 md:hidden"
        onClick={() => setIsSidebarOpen(false)}
      />
    )}
    
    {/* Sidebar Container */}
    <div className={`fixed top-14 bottom-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:static md:translate-x-0 transition duration-200 ease-in-out z-50 md:z-0 flex md:h-full`}>
      <Sidebar />
    </div>

    <div className='flex-1 overflow-y-auto min-w-0'>
      {children}
    </div>
  </div>
)
}
