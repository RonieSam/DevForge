'use client';
import { LoginApi, LogoutApi, SignupApi, VerifySessionApi } from '@/api/authApi';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react'

export const AuthContext=createContext();
export default function AuthProvider({children}) {
    const [user,setUser]=useState(null);
    const [authError,setAuthError]=useState(null);
    const [loading,setLoading]=useState(true);

    const router=useRouter()

    useEffect(()=>{
      const fetchUser=async ()=>{
        const data=await VerifySessionApi();
        if(data!=null)router.push("/dashboard")
        setUser(data)
        setLoading(false);
      }
      fetchUser()
    },[])
    
    async function logoutUser(){
      try{
        setLoading(true)
        await LogoutApi();
        setUser(null)
        setLoading(false)
      }
      catch(e){
        console.log(e)
      }
    }
    async function loginUser (email,password){
      try{
        setLoading(true);
        const data=await LoginApi(email,password);
        setAuthError(null)
        const userData=data.data;
        setUser(userData)
        router.push("/dashboard")
        setLoading(false)
      }
      catch(e){
        setAuthError("Invalid Email or Password")
      }
    }
    async function signupUser(firstName,lastName,username,email,password){
      
      try{
        setLoading(true);
        const data=await SignupApi(firstName,lastName,username,email,password);
        setAuthError(null)
        const userData=data.data;
        setUser(userData)
        router.push("/dashboard")
        setLoading(false)
      }
      catch(e){
        setAuthError(e.response?.data?.message)
      }
    }
    

    
    return (
    <AuthContext.Provider value={{user,loginUser,signupUser,authError,loading,setLoading,logoutUser}}>
        {children}
    </AuthContext.Provider>
  )
}
