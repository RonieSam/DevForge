"use client";

import { useEffect, useState } from "react";

export function BackendStatusProvider({children}) {
  const [backendOnline, setBackendOnline] = useState(true);

  useEffect(() => {
    const checkServer = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/health`);

            
                setBackendOnline(true);
                return true;
            
        } catch {
            setBackendOnline(false);
            return false;
        }

    };

    checkServer();

    const interval = setInterval(async () => {
        const online = await checkServer();

        if (online) {
            clearInterval(interval);
        }
    }, 10000); 

    return () => clearInterval(interval);
    }, []);


  return (
    <>
      {!backendOnline && (
        <div className="bg-yellow-100 border-b border-yellow-400 p-3 text-center flex items-center justify-center gap-2">
  <span className="text-xl">⚠️</span>
  <span>
    Backend server is starting up. Please wait 1-2 minutes.
  </span>
</div>
      )}

      {children}
    </>
  );
}