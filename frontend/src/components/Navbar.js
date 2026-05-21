"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { AuthContext } from "@/context/AuthProvider";
import { MobileMenuContext } from "@/context/MobileMenuContext";

import MenuDropdown from "./MenuDropdown";

export default function Navbar() {
  const { user } = useContext(AuthContext);
  const { setIsSidebarOpen } = useContext(MobileMenuContext);

  const pathname = usePathname();

  const isLandingPage = pathname === "/";

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <nav className="sticky top-0 z-50 flex h-14 shrink-0 items-center justify-between border-b border-gray-200 bg-white/90 px-6 backdrop-blur">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        {user && (
          <button
            className="rounded-md p-1.5 text-gray-600 transition hover:bg-gray-100 md:hidden"
            onClick={() => setIsSidebarOpen((prev) => !prev)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        )}

        <Link
          href={user ? "/dashboard" : "/"}
          className="text-lg font-semibold tracking-tight text-gray-800"
        >
          DevForge
        </Link>

        {/* LANDING PAGE NAV LINKS */}
        {!user && isLandingPage && (
          <div className="ml-8 hidden items-center gap-6 md:flex">
            <button
              onClick={() => scrollToSection("features")}
              className="text-sm text-gray-600 transition hover:text-black"
            >
              Features
            </button>

            <button
              onClick={() => scrollToSection("how")}
              className="text-sm text-gray-600 transition hover:text-black"
            >
              How it works
            </button>

            <button
              onClick={() => scrollToSection("footer")}
              className="text-sm text-gray-600 transition hover:text-black"
            >
              Contact
            </button>
          </div>
        )}
      </div>

      {/* SEARCH */}
      {user && (
        <div className="mx-8 flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-1.5 text-sm transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        {!user && (
          <>
            <Link
              href={"/login"}
              className="text-sm text-gray-600 transition hover:text-gray-900"
            >
              Login
            </Link>

            <button
              onClick={() => scrollToSection("features")}
              className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm text-white transition hover:bg-blue-700"
            >
              Get Started
            </button>

            <Link
              href={"/signup"}
              className="rounded-lg border border-gray-200 px-4 py-1.5 text-sm text-gray-700 transition hover:bg-gray-100"
            >
              Sign Up
            </Link>
          </>
        )}

        {user && (
          <div className="group relative flex cursor-pointer items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-medium text-white">
              {user.firstName?.charAt(0)}
            </div>

            <span className="text-sm font-medium text-gray-700">
              {user.firstName}
            </span>

            <MenuDropdown />
          </div>
        )}
      </div>
    </nav>
  );
}