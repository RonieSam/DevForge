'use client';
import { LoginApi, SignupApi } from '@/api/authApi';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState } from 'react'

export const AuthContext=createContext();
export default function AuthProvider({children}) {
    const [user,setUser]=useState(null);
    const [authError,setAuthError]=useState(null);
    const router=useRouter()

   async function loginUser (email,password){
      try{
        const data=await LoginApi(email,password);
        setAuthError(null)
        const userData=data.data;
        localStorage.setItem("token",userData.token)
        setUser({
          id:userData.id,
          firstName:userData.firstName,
          lastName:userData.lastName,
          username:userData.username,
        })
        router.push("/dashboard")
      }
      catch(e){
        setAuthError("Invalid Email or Password")
      }
    }
    async function signupUser(firstName,lastName,username,email,password){
      
      try{
        const data=await SignupApi(firstName,lastName,username,email,password);
        setAuthError(null)
        const userData=data.data;
        localStorage.setItem("token",userData.token)
        console.log(userData)
        setUser({
          id:userData.id,
          firstName:userData.firstName,
          lastName:userData.lastName,
          username:userData.username,
        })
        router.push("/dashboard")
      }
      catch(e){
        setAuthError(e.response?.data?.message)
      }
    }
    

    
    return (
    <AuthContext.Provider value={{user,loginUser,signupUser,authError}}>
        {children}
    </AuthContext.Provider>
  )
}
