"use client";

import React, { useContext, useState } from "react";
import { OrgContext } from "@/context/OrgContext";
import { TaskContext } from "@/context/TaskContext";

export default function EditTask({ setEditTask, task }) {
  const { handleUpdateTask, handleDeleteTask } = useContext(TaskContext)
  const [action, setAction] = useState("")
  const { org } = useContext(OrgContext)
  const [form, setForm] = useState({
    id: task.id,
    desc: task.desc,
    deadline: task.deadline,
    assignedTo: task.assignedTo,
    priority: task.priority,
    status: task.status
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (action === "save") {
      handleUpdateTask(form)
      setEditTask(null)
    }
    else if (action === "status") {
      handleUpdateTask(form)
      setEditTask(null)
    }
    else {
      handleDeleteTask(task.id)
      setEditTask(null)
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 w-full max-w-md relative">
      <button
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition text-sm"
        onClick={() => setEditTask(false)}
      >
        ✕
      </button>

      <h2 className="text-base font-semibold mb-5 text-gray-800">Edit Task</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
        {org.perms.includes("TASK_UPDATE") ? (
          <>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-500">Description</label>
              <input
                name="desc"
                placeholder="Task description"
                value={form.desc}
                onChange={handleChange}
                className="border border-gray-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-500">Deadline</label>
              <input
                type="datetime-local"
                name="deadline"
                value={form.deadline}
                onChange={handleChange}
                className="border border-gray-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-500">Assigned To</label>
              <input
                name="assignedTo"
                placeholder="Assign to (username)"
                value={form.assignedTo}
                onChange={handleChange}
                className="border border-gray-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-500">Priority</label>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="border border-gray-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium text-gray-400 mb-1">Description</p>
              <p className="text-sm text-gray-800">{form.desc}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-gray-400 mb-1">Deadline</p>
                <p className="text-sm text-gray-800">
                  {new Date(form.deadline).toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-400 mb-1">Priority</p>
                <span
                  className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                    form.priority === "HIGH"
                      ? "bg-red-50 text-red-700"
                      : form.priority === "MEDIUM"
                      ? "bg-yellow-50 text-yellow-700"
                      : "bg-green-50 text-green-700"
                  }`}
                >
                  {form.priority}
                </span>
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-400 mb-1">Assigned To</p>
              <p className="text-sm text-gray-800">{form.assignedTo}</p>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-2 mt-2">
          {task.status === "INPROGRESS" && (
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-green-700 transition"
              onClick={() => {
                setAction("status")
                setForm({ ...form, status: "UNDERREVIEW" })
              }}
            >
              Mark for Review
            </button>
          )}

          {task.status === "UNDERREVIEW" && org.perms.includes("TASK_STATUS_UPDATE") && (
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-green-700 transition"
              onClick={() => {
                setAction("status")
                setForm({ ...form, status: "COMPLETED" })
              }}
            >
              Mark as Completed
            </button>
          )}

          {org.perms.includes("TASK_UPDATE") && (
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-blue-700 transition"
              onClick={() => setAction("save")}
            >
              Save
            </button>
          )}

          {org.perms.includes("TASK_DELETE") && (
            <button
              type="submit"
              className="flex-1 bg-red-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-red-700 transition"
              onClick={() => setAction("delete")}
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
