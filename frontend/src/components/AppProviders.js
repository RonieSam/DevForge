"use client";

import OrgProvider from "@/context/OrgContext";
import TaskProvider from "@/context/TaskContext";
import MobileMenuProvider from "@/context/MobileMenuContext";
import { Toaster } from "react-hot-toast";
import SocketProvider from "@/context/SocketContext";

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