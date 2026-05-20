'use client';
import { AuthError } from "@/components/Error";
import { AuthContext } from "@/context/AuthProvider";
import React, { useState, useContext } from "react";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { signupUser} = useContext(AuthContext);

  const onSubmit = (e) => {
    e.preventDefault();
    signupUser(firstName, lastName, username, email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      
      {/* Card */}
      <div className="w-full max-w-sm bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        
        {/* Error */}

        {/* Title */}
        <h2 className="text-xl font-semibold mb-6 text-gray-800">
          Create your account
        </h2>

        {/* Form */}
        <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
          
          {/* Name Row */}
          <div className="flex gap-3">
            <div className="flex flex-col gap-1.5 w-1/2">
              <label className="text-xs font-medium text-gray-500">First Name</label>
              <input
                className="px-3.5 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5 w-1/2">
              <label className="text-xs font-medium text-gray-500">Last Name</label>
              <input
                className="px-3.5 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          {/* Username */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500">Username</label>
            <input
              className="px-3.5 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500">Email</label>
            <input
              className="px-3.5 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="px-3.5 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Show Password */}
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="rounded"
            />
            Show Password
          </div>

          {/* Button */}
          <button
            className="bg-blue-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-blue-700 transition mt-1"
            type="submit"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}