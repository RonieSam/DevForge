'use client';

import { getOrgUserTasks, getUserTasks } from "@/api/taskApi";
import { createContext, useContext, useEffect, useState } from "react";
import { OrgContext } from "./OrgContext";
import { AuthContext } from "./AuthProvider";

export const TaskContext=createContext();
export default function TaskProvider({children}){
    const {org}= useContext(OrgContext)
    const {user}=useContext(AuthContext)
    const [userTask,setUserTask]=useState([])
    const [selectedTasks, setSelectedTasks] = useState("my");
    const [userOrgTask,setOrgUserTask]=useState([])
    const [progress,setProgress]=useState({
        completed:0,
        underReview:0,
        inProgress:0,
        total:0
    })

    useEffect(()=>{
        if(user){
            getAllUserTasks();
        }
        if(user!=null&&org!=null)getAllOrgUserTasks();
    
        // console.log(userTask)
        // console.log(userOrgTask)
    },[org,user])

    useEffect(()=>{
        getProgress()
    },[userTask,userOrgTask,selectedTasks])

    async function getAllUserTasks(){
        const res=await getUserTasks();
        setUserTask(res)
        
    }
    async function getAllOrgUserTasks(){   
        const res=await getOrgUserTasks(org);
        setOrgUserTask(res)
    }

    function getProgress(){
        const tasks=selectedTasks=="my"?userTask:userOrgTask
        var completed=0,underReview=0,inProgress=0
        tasks.forEach((task)=>{
            if(task.status=="COMPLETED") completed++
            else if(task.status=="UNDERREVIEW")underReview++
            else if(task.status=="INPROGRESS")inProgress++
        })
        setProgress({
            completed,
            underReview,
            inProgress,
            total:tasks.length

        })

    }
    return(
        <TaskContext.Provider value={{userTask,userOrgTask,progress,setSelectedTasks,selectedTasks}}>
            {children}
        </TaskContext.Provider>
    )
}