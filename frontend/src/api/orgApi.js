import { apiClient } from "./apiClient";

export async function getAllUserOrgApi(){
    try{
        const res=await apiClient.get("/org")
        return res.data.data
    }
    catch(e){
        throw e
    }
    
}

export async function getProjects(org){
    try{
        const res=await apiClient.get(`/org/${org}/projects`)
        return res.data.data
    }
    catch(e){
        throw e;
    }
}

export async function getOrgPrefix(pre){
    try{
        const res=await apiClient.get(`/org/search?pre=${pre}`)
        return res.data.data
    }
    catch(e){
        throw e
    }
}

export async function isMember(slug){
    try{
        const res=await apiClient.get(`/org/${slug}/me`)
        return res.data.success
    }
    catch(e){
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
        throw e;
    }
}