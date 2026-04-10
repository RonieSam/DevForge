'use client';
import { getAllUserOrgApi, getOrgPrefix, getProjects, isMember, sendRequestApi } from "@/api/orgApi";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";

export const OrgContext=createContext();

export default function OrgProvider({children}){
    const [org,setOrg]=useState(null);
    const [allUserOrgs,setAllUserOrgs]=useState([])
    const [allOrgs,setAllOrgs]=useState([])
    const [allProjects,setAllProjects]=useState([])
    const {user,loading} =useContext(AuthContext)
    useEffect(()=>{
        async function getUserOrgs(){
            const orgs=await getAllUserOrgApi();
            setAllUserOrgs(orgs)
        }
        async function getAllProjects(){
            const projects=await getProjects(org.slug);
            setAllProjects(projects);
        }
        if(!user&&!loading) setAllUserOrgs([])
        else getUserOrgs()
        if(!org)setAllProjects([]);
        else getAllProjects();
    },[user,loading,org])

    async function getOrgsQuery(pre){
        try{
            const res=await getOrgPrefix(pre)
            setAllOrgs(res)
        }
        catch(e){
            throw e;
        }
    }

   

    async function checkIfMember(slug){
        try{
            const res=await isMember(slug)
            return res;
        }
        catch(e){
            throw e;
        }
    }

    function selectOrg(org){
        setOrg(org)
    }

    async function sendRequest(slug,msg){
        const res=await sendRequestApi(slug,msg)
        return res;
        
    } 
    return(
        <OrgContext.Provider value={{org,allUserOrgs,selectOrg,getOrgsQuery,allOrgs,checkIfMember,sendRequest,allProjects}}>
            {children}
        </OrgContext.Provider>
    )
}