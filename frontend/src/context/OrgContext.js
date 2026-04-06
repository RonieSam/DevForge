'use client';
import { getAllUserOrgApi, getOrgPrefix } from "@/api/orgApi";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";

export const OrgContext=createContext();

export default function OrgProvider({children}){
    const [org,setOrg]=useState(null);
    const [allUserOrgs,setAllUserOrgs]=useState([])
    const [allOrgs,setAllOrgs]=useState([])
    const {user,loading} =useContext(AuthContext)
    useEffect(()=>{
        async function getUserOrgs(){
            const orgs=await getAllUserOrgApi();
            setAllUserOrgs(orgs)
            console.log(orgs)
        }
        if(!user&&!loading) setAllUserOrgs([])
        else getUserOrgs()
    },[user,loading])

    async function getOrgsQuery(pre){
        try{
            const res=await getOrgPrefix(pre)
            console.log(res)
            setAllOrgs(res)
        }
        catch(e){
            throw e;
        }
    }

    function selectOrg(org){
        setOrg(org)
    }
    return(
        <OrgContext.Provider value={{org,allUserOrgs,selectOrg,getOrgsQuery,allOrgs}}>
            {children}
        </OrgContext.Provider>
    )
}