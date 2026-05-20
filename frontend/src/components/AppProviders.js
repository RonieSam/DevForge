"use client";

import OrgProvider from "@/context/OrgContext";
import TaskProvider from "@/context/TaskContext";
import MobileMenuProvider from "@/context/MobileMenuContext";
import { Toaster } from "react-hot-toast";

export default function AppProviders({ children }) {
    return (
        <MobileMenuProvider>
            <OrgProvider>
                <TaskProvider>
                        <Toaster position="top-right" />
                        {children}
                </TaskProvider>
            </OrgProvider>
        </MobileMenuProvider>
    );
}