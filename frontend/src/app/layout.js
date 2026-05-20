
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/context/AuthProvider";
import MainComponent from "@/components/MainComponent";
import OrgProvider from "@/context/OrgContext";
import TaskProvider from "@/context/TaskContext";
import { Toaster } from "react-hot-toast";
import SocketProvider from "@/context/SocketContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DevForge",
  description: "Project management and task tracking for development teams",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-hidden bg-white">
        <AuthProvider>
          <Navbar />
          <OrgProvider>
            <TaskProvider>
              <SocketProvider>
              <Toaster position="top-right"/>
              <MainComponent children={children}/>
              </SocketProvider> 
            </TaskProvider>
          </OrgProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
