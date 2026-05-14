'use client';
import { LoginApi, LogoutApi, SignupApi, VerifySessionApi } from '@/api/authApi';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export const AuthContext=createContext();
export default function AuthProvider({children}) {
    const [user,setUser]=useState(null);

    const [loading,setLoading]=useState(true);

    const router=useRouter()

    useEffect(()=>{
      const fetchUser=async ()=>{
        try{
          const data=await VerifySessionApi();
          setUser(data)
          setLoading(false);
        }
        catch(e){
          setUser(null)
          throw e
        }
        finally{
          setLoading(false)
        }
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
        throw (e)
      }
    }
    async function loginUser (email,password){
      try{
        setLoading(true);
        const data=await LoginApi(email,password);
        const userData=data.data;
        setUser(userData)
        router.push("/dashboard")
        setLoading(false)
      }
      catch(e){
        toast.error("Invalid Email or Password")
        router.push("/login")
        setLoading(false) 
      }
    }
    async function signupUser(firstName,lastName,username,email,password){
      
      try{
        setLoading(true);
        const data=await SignupApi(firstName,lastName,username,email,password);
        const userData=data.data;
        setUser(userData)
        router.push("/dashboard")
        setLoading(false)
      }
      catch(e){
        toast.error(e.response?.data?.message)
        router.push("/signup")
        setLoading(false)
      }
    }
    

    
    return (
    <AuthContext.Provider value={{user,loginUser,signupUser,loading,setLoading,logoutUser}}>
        {children}
    </AuthContext.Provider>
  )
}
