'use client';
import { AuthError } from "@/components/Error";
import { AuthContext } from "@/context/AuthProvider";
import React, { useContext, useState } from "react";

export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { loginUser, loginAuthError } = useContext(AuthContext);

  const onSubmit = (e) => {
    e.preventDefault();
    loginUser(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <div className="w-[380px] bg-white rounded-xl shadow-md p-6">
        
        {loginAuthError && <AuthError />}

        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Welcome back
        </h2>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Email</label>
            <input
              placeholder="Enter your email"
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Password</label>
            <input
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            Show Password
          </div>

          <button
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            type="submit"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}