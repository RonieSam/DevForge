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

export async function getOrgPrefix(pre){
    try{
        const res=await apiClient.get(`/org/search?pre=${pre}`)
        return res.data.data
    }
    catch(e){
        throw e
    }
}