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
