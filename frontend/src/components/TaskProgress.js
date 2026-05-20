export default function TaskProgress({ progress }) {
  const { completed, underReview, inProgress, total } = progress;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 w-full max-w-md">
      {/* Header row */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">
          Task Progress
        </h3>
        <span className="text-xs text-gray-400">
          {total} total
        </span>
      </div>

      {/* Stats */}
      <div className="flex gap-4 text-xs mb-3">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          <span className="text-gray-600">Done: {completed}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
          <span className="text-gray-600">Review: {underReview}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          <span className="text-gray-600">In Progress: {inProgress}</span>
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden flex">
        <div
          className="bg-green-500 transition-all duration-300"
          style={{ width: `${(completed / total) * 100 || 0}%` }}
        />
        <div
          className="bg-yellow-400 transition-all duration-300"
          style={{ width: `${(underReview / total) * 100 || 0}%` }}
        />
        <div
          className="bg-blue-500 transition-all duration-300"
          style={{ width: `${(inProgress / total) * 100 || 0}%` }}
        />
      </div>
    </div>
  );
}