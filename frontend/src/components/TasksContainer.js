"use client";
import React, { useContext, useState } from "react";
import TaskCard from "./TaskCard";
import { TaskContext } from "@/context/TaskContext";
import NoOrgSelected from "./NoOrgSelected";
import NoTasks from "./NoTasks";
import { OrgContext } from "@/context/OrgContext";
import TaskProgress from "./TaskProgress";
import NewTaskForm from "./NewTaskForm";
import EditTask from "./EditTask";

export default function TasksContainer() {
  const { userTask, userOrgTask, selectedTasks, progress, setSelectedTasks } = useContext(TaskContext);
  const { org } = useContext(OrgContext);
  const [newTask, setNewTask] = useState(false)
  const [editTask, setEditTask] = useState(null)

  const tasks = selectedTasks === "my" ? userTask : userOrgTask;

  return (
    <div className="space-y-5">
      {/* Tabs */}
      <div className="flex bg-gray-100 rounded-lg p-1 w-fit">
        <button
          onClick={() => setSelectedTasks("my")}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
            selectedTasks === "my"
            ? "bg-white shadow-sm text-gray-800"
            : "text-gray-500 hover:text-gray-700"
          }`}
        >
          My Tasks
        </button>

        <button
          onClick={() => setSelectedTasks("org")}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
            selectedTasks === "org"
            ? "bg-white shadow-sm text-gray-800"
            : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Organization
        </button>
      </div>

      {/* Progress + Create Task — side by side, centered */}
      <div className="flex justify-center items-center gap-4">
        <TaskProgress progress={progress} />
        <button
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition shrink-0 self-center"
          onClick={() => setNewTask(true)}
        >
          Create Task
        </button>
      </div>

      {/* Form / Content area */}
      <div className="flex justify-center">
        {newTask && !editTask && (
          <NewTaskForm setNewTask={setNewTask} />
        )}

        {editTask && !newTask && (
          <EditTask setEditTask={setEditTask} task={editTask} />
        )}

        {!newTask && !editTask && (
          <div className="w-full">
            {/* Empty states */}
            {selectedTasks === "org" && !org && <NoOrgSelected />}

            {selectedTasks === "my" && (!userTask || userTask.length === 0) && (
              <NoTasks message="No tasks assigned to you" setNewTask={setNewTask} />
            )}

            {selectedTasks === "org" &&
              org &&
              (!userOrgTask || userOrgTask.length === 0) && (
                <NoTasks message="No tasks in this organization" setNewTask={setNewTask} />
              )}

            {/* Task grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {tasks &&
                tasks.length > 0 &&
                tasks.map((task) => <TaskCard key={task.id} task={task} setEditTask={setEditTask} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
