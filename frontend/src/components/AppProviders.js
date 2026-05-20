"use client";

import OrgProvider from "@/context/OrgContext";
import TaskProvider from "@/context/TaskContext";
import SocketProvider from "@/context/SocketContext";
import MobileMenuProvider from "@/context/MobileMenuContext";
import { Toaster } from "react-hot-toast";

export default function AppProviders({ children }) {
    return (
        <MobileMenuProvider>
            <OrgProvider>
                <TaskProvider>
                    <SocketProvider>
                        <Toaster position="top-right" />
                        {children}
                    </SocketProvider>
                </TaskProvider>
            </OrgProvider>
        </MobileMenuProvider>
    );
}