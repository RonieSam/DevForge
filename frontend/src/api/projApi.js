import { Edu_AU_VIC_WA_NT_Arrows } from "next/font/google";
import { apiClient } from "./apiClient";


export async function getProject(id){
    try{
        const project=await apiClient.get(`/projects/${id}`)
        return project.data;
    }
    catch(e){
        console.log(e.message)
        throw e
    }
}

export async function editProject(project){
    try{
        await apiClient.put(`/projects/${project.id}`,project)
    }
    catch(e){
        console.log(e.message);
        throw e
    }
}

export async function createProject(slug,cnt){
    try{
        const proj=await apiClient.post(`/org/${slug}/projects`,{
            "name":"Project "+cnt,
            "desc":"New Project",
            "stack":[],
            "github":""
        })
        return proj.data.data;
    }
    catch(e){
        console.log(e.message)
        throw e
    }
}
