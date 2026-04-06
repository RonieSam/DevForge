'use client';
import { AuthError } from "@/components/Error";
import { AuthContext} from "@/context/AuthProvider";
import React, { useContext, useEffect, useState } from "react";

export default function Login() {
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")
    const [showPassword,setShowPassword]=useState(false);

    const {loginUser,loginAuthError}=useContext(AuthContext)
    const onSubmit=(e)=>{
        e.preventDefault()
        loginUser(email,password)
    }
 
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="h-100 w-100 border rounded">
        {loginAuthError==null&&<div className="h-13 m-2"></div>}
        {loginAuthError!=null&&<AuthError/>}

        <h2 className="p-2">Login</h2>
        <form className="flex justify-center items-center flex-col" onSubmit={onSubmit}>
          
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
        <button className="border rounded m-2 p-2" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
