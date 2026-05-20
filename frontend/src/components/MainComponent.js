'use client';

import { AuthContext } from '@/context/AuthProvider';
import AppProviders from './AppProviders';
import React, { useContext } from 'react';
import { ThreeDot } from 'react-loading-indicators';
import Navbar from './Navbar';

export default function MainComponent({ children }) {

  const { loading, user } = useContext(AuthContext);

  return (
    <>
      {loading && (
        <div className='flex flex-1 justify-center items-center'>
          <ThreeDot color={"blue"} />
        </div>
      )}
      {!loading && (
        <AppProviders key={user?.id || "guest"}>
          <Navbar />
          <main className="flex-1 flex flex-col min-h-0">
            {children}
          </main>
        </AppProviders>
      )}
    </>
  );
}