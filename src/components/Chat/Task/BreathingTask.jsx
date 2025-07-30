"use client";
import { useEffect } from "react";

export const BreathingTask = ({
  isBreathingActive,
  breathingTimeLeft,
  breathingProgress,
  breathingCompleted,
  breathingPhase,
  breathingCycle,
  isSubmitting,
  onStart,
  onComplete,
  setBreathingCompleted
}) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getBreathingInstruction = () => {
    switch (breathingPhase) {
      case "inhale":
        return "Inhale";
      case "hold":
        return "Hold";
      case "exhale":
        return "Exhale";
      default:
        return "Breathe";
    }
  };

  const renderBreathingContent = () => {
    if (!isBreathingActive) {
      return (
        <>
          <div className="mb-6">
            <div className="w-32 h-32 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center mb-4 relative">
              <div className="w-20 h-20 bg-blue-500/40 rounded-full"></div>
            </div>
            <p className="text-gray-300 mb-4">
              Ready for a 5-minute breathing session?
            </p>
            <p className="text-blue-400 text-lg">
              Inhale for 4 seconds → Hold for 4 seconds → Exhale for 4
              seconds
            </p>
          </div>
          <button
            onClick={onStart}
            className="bg-[#0059FF] text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Start Breathing Exercise
          </button>
        </>
      );
    }

    if (!breathingCompleted) {
      return (
        <>
          <div className="mb-6">
            <div className="w-32 h-32 mx-auto relative mb-4">
              {/* Background circle with pulse animation */}
              <div
                className={`w-32 h-32 rounded-full bg-blue-500/20 animate-pulse transition-all duration-1000 ${
                  breathingPhase === "inhale"
                    ? "scale-110"
                    : breathingPhase === "hold"
                    ? "scale-105"
                    : "scale-95"
                }`}
              ></div>
              {/* Progress circle */}
              <svg
                className="w-32 h-32 absolute top-0 left-0 transform -rotate-90"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                  className="text-blue-500"
                  strokeDasharray={`${breathingProgress * 2.827} 282.7`}
                  style={{
                    transition: "stroke-dasharray 1s ease-in-out",
                  }}
                />
              </svg>
              {/* Center content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-white text-xl font-bold">
                    {formatTime(breathingTimeLeft)}
                  </div>
                  <div className="text-blue-400 text-sm">remaining</div>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <p
                className={`text-2xl font-bold mb-2 transition-all duration-500 ${
                  breathingPhase === "inhale"
                    ? "text-green-400"
                    : breathingPhase === "hold"
                    ? "text-yellow-400"
                    : "text-blue-400"
                }`}
              >
                {getBreathingInstruction()}
              </p>
              <div className="flex justify-center gap-1 mb-2">
                {[1, 2, 3, 4].map((second) => (
                  <div
                    key={second}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      breathingCycle % 4 >= second - 1
                        ? breathingPhase === "inhale"
                          ? "bg-green-400"
                          : breathingPhase === "hold"
                          ? "bg-yellow-400"
                          : "bg-blue-400"
                        : "bg-gray-600"
                    }`}
                  ></div>
                ))}
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Follow the 4-4-4 breathing pattern
            </p>
          </div>

          {/* Loading state during submission */}
          {isSubmitting ? (
            <div className="flex flex-col items-center">
              <div className="flex space-x-2 mb-4">
                <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce"></div>
                <div
                  className="w-4 h-4 bg-green-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-4 h-4 bg-green-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
              <p className="text-green-400 font-medium">
                Completing your session...
              </p>
            </div>
          ) : (
            <div className="flex gap-3 justify-center">
              <button
                onClick={onComplete}
                disabled={breathingTimeLeft > 0}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Complete Task
              </button>
              <button
                disabled={isSubmitting}
                onClick={onStart}
                className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Start Over
              </button>
            </div>
          )}
        </>
      );
    }

    return (
      <>
        <div className="mb-6">
          <div className="text-6xl mb-4 animate-bounce">🎉</div>
          <h4 className="text-green-400 font-bold text-2xl mb-3">
            Congratulations!
          </h4>
          <p className="text-white font-medium text-lg mb-2">
            Breathing Exercise Complete!
          </p>
          <p className="text-gray-300 mb-4">
            Great job on completing your mindful breathing session.
          </p>
          <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/50 rounded-lg p-4 mb-4">
            <p className="text-green-300 text-sm">
              ✨ You've taken an important step for your mental
              wellness. Regular breathing exercises help reduce
              stress, improve focus, and enhance overall well-being.
            </p>
          </div>
          <div className="flex justify-center gap-2 mb-4">
            <span className="text-2xl">🧘‍♀️</span>
            <span className="text-2xl">💚</span>
            <span className="text-2xl">🌟</span>
          </div>
        </div>
        <button
          onClick={() => {
            setBreathingCompleted(false);
            onStart();
          }}
          className="bg-[#0059FF] text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Start Another Session
        </button>
      </>
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white mb-4">
        Breathing Exercise
      </h3>
      <div className="bg-[#1a1f2e] p-6 rounded-lg text-center">
        {renderBreathingContent()}
      </div>
    </div>
  );
};
