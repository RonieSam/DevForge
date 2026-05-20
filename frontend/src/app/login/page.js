'use client';
import { AuthError } from "@/components/Error";
import { AuthContext } from "@/context/AuthProvider";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { loginUser} = useContext(AuthContext);

  const onSubmit = (e) => {
    e.preventDefault();
    loginUser(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      
      <div className="w-full max-w-sm bg-white rounded-xl border border-gray-200 shadow-sm p-6">

        <h2 className="text-xl font-semibold mb-6 text-gray-800">
          Welcome back
        </h2>

        <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
          
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500">Email</label>
            <input
              placeholder="Enter your email"
              className="px-3.5 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500">Password</label>
            <input
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              className="px-3.5 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="rounded"
            />
            Show Password
          </div>

          <button
            className="bg-blue-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-blue-700 transition mt-1"
            type="submit"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}