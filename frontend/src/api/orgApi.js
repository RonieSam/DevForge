import { AArrowDown } from "lucide-react";
import { apiClient } from "./apiClient";

export async function getAllUserOrgApi(){
    try{
        const res=await apiClient.get("/org")
        return res.data.data
    }
    catch(e){
        console.log(e.message)

        throw e
    }
    
}

export async function createOrganization(orgName){
    try{
        const data={"name":orgName}
        const res=await apiClient.post("/org",data)
        return res.data.data
    }
    catch(e){
        console.log(e.message)
    
        throw e
    }
}

export async function getProjects(org){
    try{
        const res=await apiClient.get(`/org/${org}/projects`)
        return res.data.data
    }
    catch(e){
        console.log(e.message)
        throw e;
    }
}

export async function getOrgPrefix(pre){
    try{
        const res=await apiClient.get(`/org/search?pre=${pre}`)
        return res.data.data
    }
    catch(e){
        console.log(e.message)

        throw e
    }
}

export async function isMember(slug){
    try{
        const res=await apiClient.get(`/org/${slug}/me`)
        return res.data.success
    }
    catch(e){
        console.log(e.message)

        throw e
    }
}

export async function sendRequestApi(slug,msg){
    try{
        const res=await apiClient.post("/request",{
            slug:slug,
            msg:msg
        })
        return res;
    }
    catch(e){
        console.log(e.message)
        throw e;
    }
}

export async function getOrg(id){
    
    try{
        const res=await apiClient.get(`/org/${id}`)
        return res.data.data
    }
    catch(e){
        console.log(e);
        throw(e);
    }
}

export async function reviewRequest(id,status){
    try{
        await apiClient.post(`/request/${id}`,{"status":status})
    }
    catch(e){
        console.log(e)
        throw(e)
    }
}


export async function updateOrg(id,name){
    try{
        const res=await apiClient.put(`/org/${id}`,{
            "name":name
        })
        return res.data.data
    }
    catch(e){
        console.log(e)
        throw(e)
    }
}
