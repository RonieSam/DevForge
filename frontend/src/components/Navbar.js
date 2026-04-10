"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { AuthContext } from "@/context/AuthProvider";
import MenuDropdown from "./MenuDropdown";
export default function Navbar() {
  const { user} = useContext(AuthContext);

  return (
    <div className="flex justify-between items-center sticky top-0 z-50 border-b h-15">
      <div className="border">
        <Link href={"/"}>Devforge</Link>
      </div>
      <div className="flex justify-between border">
        {user == null && (
          <div>
            <Link href={"/login"}> Login </Link>{" "}
            <Link href={"/signup"}>SignUp</Link>
          </div>
        )}
        {user != null && (
          <div className="relative group">
            <div className="m-2 p-2 cursor-pointer"> {user.firstName} </div>
            <MenuDropdown/>
          </div>
          
        )}
      </div>
    </div>
  );
}
