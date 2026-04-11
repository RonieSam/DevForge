export default function NoOrgSelected({ onSelectTeam, onCreateOrg }) {
  return (
    <div className="flex flex-col items-center justify-center w-full py-16 text-center">
      
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        No organization selected
      </h2>

      {/* Subtitle */}
      <p className="text-gray-500 mb-6 max-w-sm">
        Select a team or create a new organization to start managing your tasks.
      </p>

      {/* Actions */}
      <div className="flex gap-3">
        
        <button
          onClick={onSelectTeam}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Select Team
        </button>

        <button
          onClick={onCreateOrg}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
        >
          Create Organization
        </button>

      </div>
    </div>
  );
}