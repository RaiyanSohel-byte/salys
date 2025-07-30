"use client";

export const ProgressOverview = ({
  completedTasks,
  streak,
  totalGratitudeEntries,
  totalBreathingSessions,
  totalaffirmationEntries
}) => {
  return (
    <div className="bg-[#272f3c] rounded-lg p-6 h-full border border-gray-600">
      <h2 className="text-xl font-semibold text-white mb-4">
        Progress Overview
      </h2>
      <div className="space-y-4">
        <div className="bg-[#1a1f2e] p-4 rounded">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-300">Today's Tasks</span>
            <span className="text-blue-400 font-bold">
              {completedTasks || 0}/3
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${(completedTasks / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-[#1a1f2e] p-4 rounded">
          <div className="flex justify-between items-center mb-2">
            <span className="text-green-400 font-bold">
              Weekly Streak
            </span>
          </div>
          <div className="flex gap-3 items-center">
            {streak.length > 0 &&
              streak.map((day) => (
                <div
                  key={day.id}
                  className={`w-6 h-6 rounded ${
                    day.complete ? "bg-green-500" : "bg-gray-600"
                  }`}
                ></div>
              ))}
          </div>
        </div>

        <div className="bg-[#1a1f2e] p-4 rounded">
          <h4 className="text-white font-medium mb-2">
            Quick daily Stats
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Gratitude entries</span>
              <span className="text-white">
                {totalGratitudeEntries}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Breathing sessions</span>
              <span className="text-white">
                {totalBreathingSessions}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">
                Affirmations practiced
              </span>
              <span className="text-white">
                {totalaffirmationEntries}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
