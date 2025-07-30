"use client";
import { useState } from "react";

export const GratitudeTask = ({
  gratitudeText,
  setGratitudeText,
  hasSubmittedToday,
  isSubmitting,
  onSubmit,
  gratitudeEntries,
  isLoading
}) => {
  const renderGratitudeInput = () => {
    if (hasSubmittedToday) {
      return (
        <div className="text-center">
          <div className="text-4xl mb-4">✅</div>
          <h4 className="text-green-400 font-medium mb-2">
            Today's Gratitude Complete!
          </h4>
          <p className="text-gray-300 mb-4">
            You've already shared your gratitude for today. Come back
            tomorrow to continue your practice.
          </p>
          <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
            <p className="text-green-300 text-sm">
              Consistency is key to developing a grateful mindset. Keep
              up the great work!
            </p>
          </div>
        </div>
      );
    }

    return (
      <>
        <p className="text-gray-300 mb-4">
          Take a moment to reflect on what you're grateful for today.
        </p>
        <textarea
          value={gratitudeText}
          onChange={(e) => setGratitudeText(e.target.value)}
          className="w-full h-32 p-3 bg-[#272f3c] text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
          placeholder="Write what you're grateful for today..."
        />
        <button
          onClick={onSubmit}
          disabled={isSubmitting || !gratitudeText.trim()}
          className="mt-4 bg-[#0059FF] text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Saving..." : "Save Gratitude Entry"}
        </button>
      </>
    );
  };

  const renderGratitudeEntries = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center flex-1">
          <div className="text-center text-white">
            <div className="flex space-x-2 mb-4">
              <div className="w-3 h-3 bg-[#0059FF] rounded-full animate-bounce"></div>
              <div
                className="w-3 h-3 bg-[#0059FF] rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-3 h-3 bg-[#0059FF] rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
            <p className="text-gray-300">Loading entries...</p>
          </div>
        </div>
      );
    }

    if (gratitudeEntries.length > 0) {
      return (
        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          {gratitudeEntries.map((entry) => (
            <div key={entry.id} className="bg-[#1a1f2e] p-4 rounded-lg">
              <p className="text-white mb-2">{entry.content}</p>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">
                  {new Date(entry.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <span className="text-gray-500">
                  {new Date(entry.created_at).toLocaleTimeString(
                    "en-US",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🙏</div>
          <h4 className="text-white font-medium mb-2">
            No gratitude entries yet
          </h4>
          <p className="text-gray-400 text-sm">
            Start by writing what you're grateful for today!
          </p>
        </div>
      </div>
    );
  };

  return {
    input: (
      <div className="space-y-4 h-full flex flex-col">
        <h3 className="text-xl font-semibold text-white mb-4">
          Daily Gratitude Practice
        </h3>
        <div className="bg-[#1a1f2e] p-6 rounded-lg">
          {renderGratitudeInput()}
        </div>
      </div>
    ),
    entries: (
      <div className="h-full flex flex-col">
        <h3 className="text-xl font-semibold text-white mb-4">
          Your Gratitude Entries
        </h3>
        {renderGratitudeEntries()}
      </div>
    )
  };
};
