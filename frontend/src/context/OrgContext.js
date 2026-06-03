'use client';
import { createOrganization, getAllUserOrgApi, getOrgPrefix, getProjects, isMember, sendRequestApi, updateOrg } from "@/api/orgApi";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { createProject } from "@/api/projApi";

export const OrgContext=createContext();

export default function OrgProvider({children}){
    const [org,setOrg]=useState(null);
    const [allUserOrgs,setAllUserOrgs]=useState([])
    const [allOrgs,setAllOrgs]=useState([])
    const [allProjects,setAllProjects]=useState([])
    const {user,loading} =useContext(AuthContext)
    
    useEffect(()=>{
        
        if(!user&&!loading) setAllUserOrgs([])
        else getUserOrgs()
        if(!org)setAllProjects([]);
        else getAllProjects();
    },[user,loading,org])

    
    async function getUserOrgs(){
            const orgs=await getAllUserOrgApi();
            setAllUserOrgs(orgs)
        }
    async function getAllProjects(){
        const projects=await getProjects(org.slug);
        setAllProjects(projects);
    }

    async function getOrgsQuery(pre){
        try{
            const res=await getOrgPrefix(pre)
            setAllOrgs(res)
        }
        catch(e){
            throw e;
        }
    }

    async function handleCreateOrg(orgName){
        const data=await createOrganization(orgName);
        selectOrg(data)
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

    function projectAccessCheck(projId){
        
        return org&&allProjects&&allProjects.some(
            (project)=>projId==project.id
        )
    }

    async function sendRequest(slug,msg){
        const res=await sendRequestApi(slug,msg)
        return res;
        
    } 

    function checkPermission(action){
        return org&&org.perms.includes(action);

    }

    async function onProjectCreation(){
        const proj=await createProject(org.slug,allProjects.length)
        getAllProjects();
        return proj.id;
    }

    async function handleOrgUpdation(id,name){
        const data=await updateOrg(id,name)
        await getUserOrgs()
        return data
    }
    return(
        <OrgContext.Provider value={{org,allUserOrgs,selectOrg,getOrgsQuery,allOrgs,checkIfMember,sendRequest,allProjects,checkPermission,projectAccessCheck,onProjectCreation,handleCreateOrg,handleOrgUpdation}}>
            {children}
        </OrgContext.Provider>
    )
}