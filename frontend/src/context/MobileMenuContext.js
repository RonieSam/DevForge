'use client';
import React, { createContext, useState } from 'react';

export const MobileMenuContext = createContext();

export default function MobileMenuProvider({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <MobileMenuContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      {children}
    </MobileMenuContext.Provider>
  );
}
