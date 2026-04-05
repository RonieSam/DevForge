'use client';
import { AuthError } from "@/components/Error";
import { AuthContext } from "@/context/AuthProvider";
import React, { useState,useContext } from "react";

export default function Signup() {
    const [firstName,setFirstName]=useState("")
    const [lastName,setLastName]=useState("")
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")
    const [showPassword,setShowPassword]=useState(false);
    const {signupUser,authError}=useContext(AuthContext)

    const onSubmit=(e)=>{
        e.preventDefault()
        signupUser(firstName,lastName,username,email,password)
    }
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="h-130 w-100 border rounded">
        {authError==null&&<div className="h-13 m-2"></div>}
        {authError!=null&&<AuthError/>}
        <h2 className="p-2">Sign Up</h2>
        <form className="flex justify-center items-center flex-col" onSubmit={onSubmit}>
          <div>
            <label>First Name</label>
            <input placeholder="Enter First Name" className="m-2 border p-2" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
          </div>
          <div>
            <label>Last Name</label>
            <input placeholder="Enter Last Name" className="m-2 border p-2" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
          </div>
          <div>
            <label>Username</label>
            <input placeholder="Enter Username" className="m-2 border p-2" value={username} onChange={(e)=>setUsername(e.target.value)}/>
          </div>
          <div>
            <label>Email Id</label>
            <input placeholder="Enter Email" className="m-2 border p-2" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div>
            <label>Password</label>
            <input placeholder="Enter Password" className="m-2 border p-2" value={password}type={showPassword?"text":"password"} onChange={(e)=>setPassword(e.target.value)} />
          </div>
          <div><input type="checkbox" checked={showPassword} onChange={()=>{setShowPassword(!showPassword)}
        }/> Show Password</div>
        <button className="border rounded m-2 p-2" type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
