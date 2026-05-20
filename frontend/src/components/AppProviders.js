"use client";

import OrgProvider from "@/context/OrgContext";
import TaskProvider from "@/context/TaskContext";
import SocketProvider from "@/context/SocketContext";
import { Toaster } from "react-hot-toast";

export default function AppProviders({ children }) {
    return (
        <OrgProvider>
            <TaskProvider>
                <SocketProvider>
                    <Toaster position="top-right" />
                    {children}
                </SocketProvider>
            </TaskProvider>
        </OrgProvider>
    );
}