export default function NoTasks({message,setNewTask}) {
  return (
    <div className="flex flex-col items-center justify-center w-full py-16 text-center">
      
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        {message}
      </h2>

      {/* Subtitle */}
      <p className="text-sm text-gray-500 mb-6 max-w-sm">
        Once tasks are assigned, they will appear here.
      </p>

      {/* Optional Action */}
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" onClick={()=>setNewTask(true)} >
        Create Task
      </button>

    </div>
  );
}