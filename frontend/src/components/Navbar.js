"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { AuthContext } from "@/context/AuthProvider";
import MenuDropdown from "./MenuDropdown";

export default function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex justify-between items-center bg-white px-6 h-16 border-b shadow-sm">
      <Link href={"/"} className="text-xl font-semibold text-gray-800">
        DevForge
      </Link>

      {user && (
        <div className="flex-1 mx-6 max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      <div className="flex items-center gap-4">
        {!user && (
          <>
            <Link href={"/login"} className="text-gray-600 hover:text-black">
              Login
            </Link>

            <Link
              href={"/signup"}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>
          </>
        )}

        {user && (
          <div className="relative group flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">
              {user.firstName?.charAt(0)}
            </div>

            <span className="text-gray-700 font-medium">{user.firstName}</span>

            <MenuDropdown />
          </div>
        )}
      </div>
    </div>
  );
}
