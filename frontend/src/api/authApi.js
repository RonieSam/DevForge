
'use client';
import { apiClient } from "./apiClient";


export async function LoginApi(email,password){
    try{
        const res=await apiClient.post("/auth/login",{
        email:email,
        password:password
    })
    return res.data;
    
    }
    catch(err){
        throw(err)
    }   
}
export async function SignupApi(firstName,lastName,username,email,password){
    try{

        const res=await apiClient.post("/auth/signup",{
        firstName:firstName,
        lastName:lastName,
        username:username,
        email:email,
        password:password
    })
    return res.data
    }
    catch(err){
        throw(err)

    }  
}