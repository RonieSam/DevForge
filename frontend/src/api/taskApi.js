import { apiClient } from "./apiClient";


export async function getOrgUserTasks(org){
    try{
        const res=await apiClient.get(`/tasks/me`,{params:{orgId:org.id}})
        return res.data.data
    }
    catch(e){
        console.log(e.message)
        throw e;
    }
}
export async function getUserTasks(){
    try{
        const res=await apiClient.get(`/tasks/me`)
        return res.data.data
    }
    catch(e){
        console.log(e.message)
        throw e;
    }
}