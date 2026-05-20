export default function NoOrgSelected({ onSelectTeam, onCreateOrg }) {
  return (
    <div className="flex flex-col items-center justify-center w-full py-20 text-center">
      
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800 mb-1.5">
        No organization selected
      </h2>

      {/* Subtitle */}
      <p className="text-sm text-gray-400 mb-6 max-w-xs">
        Select a team or create a new organization to start managing your tasks.
      </p>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={onSelectTeam}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
        >
          Select Team
        </button>

        <button
          onClick={onCreateOrg}
          className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition"
        >
          Create Organization
        </button>
      </div>
    </div>
  );
}