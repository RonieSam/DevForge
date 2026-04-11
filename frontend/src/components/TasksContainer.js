"use client";
import React, { useContext, useState } from "react";
import TaskCard from "./TaskCard";
import { TaskContext } from "@/context/TaskContext";
import NoOrgSelected from "./NoOrgSelected";
import NoTasks from "./NoTasks";
import { OrgContext } from "@/context/OrgContext";
import TaskProgress from "./TaskProgress";
import NewTaskForm from "./NewTaskForm";

export default function TasksContainer() {
  const { userTask, userOrgTask ,selectedTasks,progress,setSelectedTasks } = useContext(TaskContext);
  const { org } = useContext(OrgContext);
  const [newTask,setNewTask]=useState(false)


  const tasks = selectedTasks === "my" ? userTask : userOrgTask;

  return (
    <div className="m-5">
      {/* Tabs */}
      <div className="flex bg-gray-100 rounded-lg p-1 w-fit">
        <button
          onClick={() => setSelectedTasks("my")}
          className={`px-4 py-1.5 rounded-md text-sm ${
            selectedTasks === "my"
            ? "bg-white shadow text-gray-800"
            : "text-gray-500 hover:text-gray-700"
          }`}
          >
          My Tasks
        </button>

        <button
          onClick={() => setSelectedTasks("org")}
          className={`px-4 py-1.5 rounded-md text-sm ${
            selectedTasks === "org"
            ? "bg-white shadow text-gray-800"
            : "text-gray-500 hover:text-gray-700"
          }`}
          >
          Organization
        </button>
      </div>

      <div className="w-full flex justify-center items-center"><TaskProgress progress={progress}/> <button className="h-[50%] px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" onClick={()=>setNewTask(true)}>
        Create Task
      </button></div>
    <div className="flex justify-center">
      {newTask&&<NewTaskForm setNewTask={setNewTask}/>}
      {/* Content */}
      {!newTask&&<div className="mt-4">
        {/* No org selected */}
        {selectedTasks === "org" && !org && <NoOrgSelected />}

        {/* No tasks */}
        {selectedTasks === "my" && (!userTask || userTask.length === 0) && (
          <NoTasks message="No tasks assigned to you" />
        )}

        {selectedTasks === "org" &&
          org &&
          (!userOrgTask || userOrgTask.length === 0) && (
            <NoTasks message="No tasks in this organization" />
          )}

        {/* Task list */}
        <div className="flex flex-wrap gap-4">
          {tasks &&
            tasks.length > 0 &&
            tasks.map((task) => <TaskCard key={task.id} task={task} />)}
        </div>
      </div>}
      </div>
    </div>
  );
}
