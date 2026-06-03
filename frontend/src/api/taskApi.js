import toast from "react-hot-toast";
import { apiClient } from "./apiClient";


export async function getOrgUserTasks(org){
    try{
        const res=await apiClient.get(`/tasks/me`,{params:{orgId:org.id}})
        return res.data.data

    }
    catch(e){
        toast.error("Failed to fetch tasks")
        throw e;
    }
}
export async function getUserTasks(){
    try{
        const res=await apiClient.get(`/tasks/me`)
        return res.data.data
    }
    catch(e){
        toast.error("Failed to fetch tasks")
        throw e;
    }
}

export async function createTask(task){
    try{
        await apiClient.post(`projects/${task.project}/tasks`,task)
        toast.success("Task has been created")
    }
    catch(e){
        toast.error("Failed to create tasks",{id:"task_creation"})
        throw(e);
    }
}

export async function updateTask(task){
    try{
        
        await apiClient.put(`tasks/${task.id}`,task)
        toast.success("Task has been updated")
    }
    catch(e){
        toast.error("Failed to create tasks",{id:"task_updation"})
        throw(e);
    }
}
export async function deleteTask(id){
    try{
        await apiClient.delete(`tasks/${id}`,null)
        toast.success("Task has been deleted")
    }
    catch(e){
        toast.error("Failed to create tasks",{id:"task_deletion"})
        throw(e);
    }
}

