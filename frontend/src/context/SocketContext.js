
"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export const SocketContext = createContext();

export default function SocketProvider({ children }) {

  const clientRef = useRef(null);
  const [connected,setConnected]=useState(false)

  useEffect(() => {

    const client = new Client({
      webSocketFactory: () =>
      new SockJS(`${NEXT_PUBLIC_API_URL}/ws`), 

      reconnectDelay: 5000,

      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        setConnected(true)
      },
      onDisconnect:()=>{
        setConnected(false)
      }
    });

    client.activate();

    clientRef.current = client;

    return () => {
      client.deactivate();
    };

  }, []);

  function subscribe(destination, callback) {
    if(!connected)return
    return clientRef.current.subscribe(destination, callback);
  }

  function publish(destination, content) {

    if (!connected) return;

    clientRef.current.publish({
      destination,
      body: JSON.stringify(content),
    });
  }

  return (
    <SocketContext.Provider
      value={{
        client: clientRef.current,
        subscribe,
        publish,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

