export default function TaskProgress({ progress }) {
  const { completed, underReview, inProgress, total } = progress;

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 w-full max-w-md m-3">
      
      {/* Title */}
      <h3 className="text-sm font-semibold text-gray-700 mb-3">
        Task Progress
      </h3>

      {/* Stats */}
      <div className="flex justify-between text-sm mb-3">
        <span className="text-green-600">Done: {completed}</span>
        <span className="text-yellow-600">Review: {underReview}</span>
        <span className="text-blue-600">In Progress: {inProgress}</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden flex">
        
        <div
          className="bg-green-500"
          style={{ width: `${(completed / total) * 100 || 0}%` }}
        />

        <div
          className="bg-yellow-400"
          style={{ width: `${(underReview / total) * 100 || 0}%` }}
        />

        <div
          className="bg-blue-500"
          style={{ width: `${(inProgress / total) * 100 || 0}%` }}
        />

      </div>

      {/* Total */}
      <div className="text-xs text-gray-500 mt-2">
        Total Tasks: {total}
      </div>

    </div>
  );
}