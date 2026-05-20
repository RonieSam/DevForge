"use client";

import { editProject, getMessage, getProject } from "@/api/projApi";
import ProjectForm from "@/components/ProjectForm";
import { AuthContext } from "@/context/AuthProvider";
import { OrgContext } from "@/context/OrgContext";
import { SocketContext } from "@/context/SocketContext";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function ProjectWorkspace() {
  const params = useParams();
  const router = useRouter();
  const { checkPermission, projectAccessCheck } = useContext(OrgContext)
  const { subscribe, publish } = useContext(SocketContext);
  const { user } = useContext(AuthContext)

  const messageContainerRef = useRef(null)
  const [edit, setEdit] = useState(false);
  const [project, setProject] = useState(null);
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    async function initialize() {
      try {
        const proj = await getProject(params.id)
        setProject(proj.data)
        const mes = await getMessage(params.id)
        setMessages(mes)
      } catch (e) {
        console.log(e)
      }
    }

    if (!projectAccessCheck(params.id)) {
      toast.error("Project not found", {
        id: "ProjectNotFound"
      })
      router.push("/dashboard")
    }
    initialize();

    const sub = subscribe(`/topic/projects/${params.id}`, (message) => {
      const data = JSON.parse(message.body)
      setMessages(prev => ([...prev, data]))
    })

    return () => {
      sub?.unsubscribe()
    }
  }, [params.id]);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  function handleSendMsg() {
    publish(
      `/app/projects/${params.id}`,
      {
        "sender": user.username,
        content
      }
    )
    setContent("")
  }

  async function handleEdit(form) {
    await editProject(form)
    const proj = await getProject(params.id);
    setProject(proj.data);
  }

  return (
    <>
      {project && (
        <div className="min-h-full bg-gray-50 text-gray-900 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">

            {/* Header Card */}
            {!edit ? (
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  {/* Left: project info */}
                  <div className="space-y-3 flex-1 min-w-0">
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                      {project.name}
                    </h1>
                    <p className="text-sm text-gray-500 max-w-2xl leading-relaxed">
                      {project.desc}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-400 flex-wrap">
                      <p>Created by: <span className="text-gray-600">{project.creater}</span></p>
                      <Link
                        href={project.github}
                        className="underline hover:text-gray-700 transition"
                        target="_blank"
                      >
                        GitHub Repository
                      </Link>
                    </div>
                  </div>

                  {/* Right: stack + edit */}
                  <div className="shrink-0 space-y-4">
                    <div className="flex gap-2 flex-wrap max-w-sm">
                      {project.stack.map((name, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-lg bg-gray-100 border border-gray-200 text-xs font-medium text-gray-600"
                        >
                          {name}
                        </span>
                      ))}
                    </div>

                    {checkPermission("PROJECT_UPDATE") && (
                      <div className="flex justify-end">
                        <button
                          className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition"
                          onClick={() => setEdit(true)}
                        >
                          Edit Project
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <ProjectForm project={project} closeForm={setEdit} submitForm={handleEdit} setProject={setProject} />
            )}

            {/* Main content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" style={{ height: 'calc(100vh - 260px)', minHeight: '480px' }}>

              {/* Tasks panel */}
              <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col min-h-0">
                <div className="flex items-center justify-between mb-4 shrink-0">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Project Tasks
                  </h2>
                  <span className="text-xs text-gray-400">{project.tasks.length} tasks</span>
                </div>

                <div className="space-y-3 overflow-y-auto flex-1 pr-1 min-h-0">
                  {project.tasks.map((task, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="space-y-1 min-w-0">
                          <h3 className="text-sm font-semibold text-gray-800">
                            {task.desc}
                          </h3>
                          <p className="text-xs text-gray-400">
                            Assigned to: {task.assignedTo}
                          </p>
                        </div>

                        <div className="flex gap-2 shrink-0">
                          <span className="px-2.5 py-1 rounded-md bg-gray-100 border border-gray-200 text-xs font-medium text-gray-600">
                            {task.status}
                          </span>
                          <span className="px-2.5 py-1 rounded-md bg-gray-100 border border-gray-200 text-xs font-medium text-gray-600">
                            {task.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right sidebar */}
              <div className="flex flex-col gap-6 min-h-0">

                {/* Activity Logs */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col h-[35%] min-h-[180px]">
                  <h2 className="text-base font-semibold text-gray-800 mb-4 shrink-0">
                    Activity Logs
                  </h2>

                  <div className="space-y-3 overflow-y-auto flex-1 pr-1 min-h-0">
                    {project.logs.map((log, idx) => (
                      <div
                        key={idx}
                        className="border-l-2 border-gray-200 pl-3 text-xs text-gray-600 leading-relaxed"
                      >
                        {log}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Team Discussion */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col flex-1 min-h-0">
                  <h2 className="text-base font-semibold text-gray-800 mb-4 shrink-0">
                    Team Discussion
                  </h2>

                  {/* Messages */}
                  <div className="space-y-3 overflow-y-auto flex-1 pr-1 min-h-0" ref={messageContainerRef}>
                    {messages.map((msg, idx) => (
                      <div key={idx}>
                        <p className="text-xs font-medium text-gray-700 mb-1">
                          {msg.sender}
                        </p>
                        <div className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 leading-relaxed">
                          {msg.content}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message input */}
                  <div className="mt-4 flex gap-2 shrink-0">
                    <input
                      placeholder="Send a message..."
                      className="flex-1 min-w-0 bg-white border border-gray-200 rounded-lg px-3.5 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      value={content}
                      onChange={(e) => { setContent(e.target.value) }}
                    />
                    <button
                      className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition shrink-0"
                      onClick={handleSendMsg}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
