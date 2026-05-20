export default function NoTasks({message, setNewTask}) {
  return (
    <div className="flex flex-col items-center justify-center w-full py-20 text-center">
      
      {/* Title */}
      <h2 className="text-base font-semibold text-gray-800 mb-1.5">
        {message}
      </h2>

      {/* Subtitle */}
      <p className="text-sm text-gray-400 mb-6 max-w-xs">
        Once tasks are assigned, they will appear here.
      </p>

      {/* Action */}
      <button
        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
        onClick={()=>setNewTask(true)}
      >
        + Create Task
      </button>
    </div>
  );
}