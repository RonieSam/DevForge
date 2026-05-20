"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { AuthContext } from "@/context/AuthProvider";
import MenuDropdown from "./MenuDropdown";

export default function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <nav className="flex justify-between items-center bg-white px-6 h-14 border-b border-gray-200 shrink-0">
      <Link href={"/dashboard"} className="text-lg font-semibold text-gray-800 tracking-tight">
        DevForge
      </Link>

      {user && (
        <div className="flex-1 mx-8 max-w-sm">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3.5 py-1.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>
      )}

      <div className="flex items-center gap-3">
        {!user && (
          <>
            <Link href={"/login"} className="text-sm text-gray-600 hover:text-gray-900 transition">
              Login
            </Link>

            <Link
              href={"/signup"}
              className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded-lg hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>
          </>
        )}

        {user && (
          <div className="relative group flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-medium">
              {user.firstName?.charAt(0)}
            </div>

            <span className="text-sm text-gray-700 font-medium">{user.firstName}</span>

            <MenuDropdown />
          </div>
        )}
      </div>
    </nav>
  );
}
