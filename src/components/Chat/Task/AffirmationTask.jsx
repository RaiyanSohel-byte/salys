"use client";

export const AffirmationTask = ({
  affirmationText,
  isSubmittingAffirmation,
  affirmationCompleted,
  onGenerateNew,
  onMarkAsRead
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white mb-4">
        Daily Affirmations
      </h3>
      <div className="bg-[#1a1f2e] p-6 rounded-lg">
        <div className="text-center mb-6">
          <div className="text-4xl mb-4">✨</div>
          <p className="text-blue-400 text-xl italic mb-4">
            "
            {affirmationText.text ||
              "Believe in yourself and all that you are."}
            "
          </p>
          <p className="text-gray-300 text-sm">
            A daily reminder to stay positive and focused.
          </p>
        </div>
        <div className="space-y-3">
          <button
            disabled={affirmationCompleted}
            onClick={onGenerateNew}
            className="w-full disabled:opacity-50 disabled:cursor-not-allowed bg-[#0059FF] text-white py-3 rounded hover:bg-blue-600 transition-colors"
          >
            Generate New Affirmation
          </button>
          <button
            disabled={isSubmittingAffirmation}
            onClick={onMarkAsRead}
            className="w-full bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded cursor-pointer hover:bg-green-700 transition-colors"
          >
            {isSubmittingAffirmation ? "Submitting..." : "Mark as Read"}
          </button>
        </div>
      </div>
    </div>
  );
};
