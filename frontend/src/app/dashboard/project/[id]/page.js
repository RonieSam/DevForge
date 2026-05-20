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
  const {checkPermission,projectAccessCheck}= useContext(OrgContext)
  const { subscribe, publish } = useContext(SocketContext);
  const {user}=useContext(AuthContext)

  const messageContainerRef=useRef(null)
  const [edit, setEdit] = useState(false);
  const [project, setProject] = useState(null);
  const [messages,setMessages]=useState([]);
  const [content,setContent]=useState("");
  
  useEffect(() => {
    async function initialize() {
      try {
        const proj = await getProject(params.id)
        setProject(proj.data)
        const mes=await getMessage(params.id)
        setMessages(mes)
      } catch (e) {
        console.log(e)
      }
    }

   
    if(!projectAccessCheck(params.id)){
      toast.error("Project not found",{
        id:"ProjectNotFound"
      })
      router.push("/dashboard")
    }
    initialize();

    const sub=subscribe(`/topic/projects/${params.id}`,(message)=>{
      const data=JSON.parse(message.body)
      setMessages(prev=>([...prev,data]))
    })
    

    return()=>{
      sub?.unsubscribe()
    }
  }, [params.id]);

   useEffect(() => {

  if(messageContainerRef.current){

    messageContainerRef.current.scrollTop =
      messageContainerRef.current.scrollHeight;
  }

}, [messages]);


 

  function handleSendMsg(){
    publish(
      `/app/projects/${params.id}`,
      {
        "sender":user.username,
        content
      }
    )
    setContent("")
  }


  
  async function handleEdit(form){
    await editProject(form)
    const proj = await getProject(params.id);
    setProject(proj.data);
  }

 

  return (
    <>
      {project && (
        <div className="min-h-screen bg-zinc-100 text-zinc-900 p-6 pb-10 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            {!edit ? (
              <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="space-y-3">
                    <h1 className="text-4xl font-bold">{project.name}</h1>
                    <p className="text-zinc-500 max-w-2xl">{project.desc}</p>
                    <div className="flex items-center gap-4 text-sm text-zinc-500 flex-wrap">
                      <p>Created by: {project.creater}</p>
                      <Link
                        href={project.github}
                        className="underline hover:text-zinc-900 transition"
                        target="_blank"
                      >
                        GitHub Repository
                      </Link>
                    </div>
                  </div>
                  {/* Stack */}
                  <div>
                  <div className="flex gap-3 flex-wrap max-w-xl">
                    {project.stack.map((name, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 rounded-xl bg-zinc-100 border border-zinc-200 text-sm font-medium"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                   <div className="flex justify-end mt-6">
                  {checkPermission("PROJECT_UPDATE")&&<button className="px-5 py-2 rounded-xl bg-zinc-900 text-white hover:bg-zinc-700 transition" onClick={()=>setEdit(true)}>
                    Edit Project
                  </button>}
                </div>
                </div>
                </div>
               
              </div>
            ) : (
              <ProjectForm project={project} closeForm={setEdit} submitForm={handleEdit} setProject={setProject}/>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[75vh] pb-15">

  {/* Tasks */}
  <div className="lg:col-span-2 bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm flex flex-col h-[75vh]">

    <div className="flex items-center justify-between mb-6 shrink-0">
      <h2 className="text-2xl font-semibold">
        Project Tasks
      </h2>
    </div>

    <div className="space-y-4 overflow-y-auto flex-1 pr-2">

      {project.tasks.map((task, idx) => (
        <div
          key={idx}
          className="bg-zinc-50 border border-zinc-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">
                {task.desc}
              </h3>

              <p className="text-zinc-500 text-sm">
                Assigned to: {task.assignedTo}
              </p>
            </div>

            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-lg bg-zinc-100 border border-zinc-200 text-sm">
                {task.status}
              </span>

              <span className="px-3 py-1 rounded-lg bg-zinc-100 border border-zinc-200 text-sm">
                {task.priority}
              </span>
            </div>

          </div>
        </div>
      ))}

    </div>
  </div>

  {/* Right Sidebar */}
  <div className="flex flex-col gap-6 h-[75vh]">

    {/* Logs */}
    <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm flex flex-col h-[35%]">

      <h2 className="text-xl font-semibold mb-5 shrink-0">
        Activity Logs
      </h2>

      <div className="space-y-4 overflow-y-auto flex-1 pr-2">

        {project.logs.map((log, idx) => (
          <div
            key={idx}
            className="border-l-2 border-zinc-300 pl-4 text-sm text-zinc-700"
          >
            {log}
          </div>
        ))}

      </div>
    </div>

    {/* Discussion */}
    <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm flex flex-col flex-1 min-h-0">

      <h2 className="text-xl font-semibold mb-5 shrink-0">
        Team Discussion
      </h2>

      {/* Messages */}
      <div className="space-y-5 overflow-y-auto flex-1 pr-2 min-h-0" ref={messageContainerRef}>

        {messages.map((msg, idx) => 
        
        
          (
          
          <div key={idx}>
            <div className="flex items-center justify-between mb-1">
              <p className="font-medium">
                {msg.sender}
              </p>
            </div>

            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-3 text-sm text-zinc-700">
              {msg.content}
            </div>

          </div>
        ))}

      </div>

      {/* Input */}
      <div className="mt-5 flex gap-2 shrink-0">

        <input
          placeholder="Send a message..."
          className="flex-1 bg-white border border-zinc-300 rounded-xl px-4 py-3 outline-none focus:border-zinc-500"
          value={content}
          onChange={(e)=>{setContent(e.target.value)}}
        />

        <button className="bg-zinc-900 text-white px-5 rounded-xl font-medium hover:bg-zinc-800 transition" onClick={handleSendMsg}>
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
