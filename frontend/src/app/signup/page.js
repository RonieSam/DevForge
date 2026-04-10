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

  const { signupUser, signAuthError } = useContext(AuthContext);

  const onSubmit = (e) => {
    e.preventDefault();
    signupUser(firstName, lastName, username, email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      {/* Card */}
      <div className="w-[420px] bg-white rounded-xl shadow-md p-6">
        
        {/* Error */}
        {signAuthError && <AuthError />}

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Create your account
        </h2>

        {/* Form */}
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          
          {/* Name Row */}
          <div className="flex gap-3">
            <div className="flex flex-col w-1/2">
              <label className="text-sm text-gray-600 mb-1">First Name</label>
              <input
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="flex flex-col w-1/2">
              <label className="text-sm text-gray-600 mb-1">Last Name</label>
              <input
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          {/* Username */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Username</label>
            <input
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Email</label>
            <input
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Show Password */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            Show Password
          </div>

          {/* Button */}
          <button
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            type="submit"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}