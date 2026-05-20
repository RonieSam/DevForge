import React from 'react'
import SocketProvider from "@/context/SocketContext";

export default function layout({children}) {
  return (
    <div>
        <SocketProvider>
        {children}
        </SocketProvider>
    </div>
  )
}
