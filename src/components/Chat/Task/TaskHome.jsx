"use client";
import { GratitudeTask } from "./GratitudeTask";
import { BreathingTask } from "./BreathingTask";
import { AffirmationTask } from "./AffirmationTask";
import { ProgressOverview } from "./ProgressOverview";
import { NavigationTabs } from "./NavigationTabs";
import { useTaskLogic } from "@/hooks/useTaskLogic";

export const TaskHome = () => {
  const {
    // State
    activeTab,
    setActiveTab,
    isLoading,
    gratitudeEntries,
    gratitudeText,
    setGratitudeText,
    isSubmitting,
    hasSubmittedToday,
    isBreathingActive,
    breathingTimeLeft,
    breathingProgress,
    breathingCompleted,
    setBreathingCompleted,
    breathingPhase,
    breathingCycle,
    completedTasks,
    streak,
    totalGratitudeEntries,
    totalBreathingSessions,
    totalaffirmationEntries,
    affirmationText,
    isSubmittingAffirmation,
    affirmationCompleted,
    // Functions
    submitGratitudeEntry,
    startBreathingExercise,
    completeBreathingExercise,
    handleAffirmationSubmit,
    fetchaffirmation,
  } = useTaskLogic();

  const renderContent = () => {
    const gratitudeComponent = GratitudeTask({
      gratitudeText,
      setGratitudeText,
      hasSubmittedToday,
      isSubmitting,
      onSubmit: submitGratitudeEntry,
      gratitudeEntries,
      isLoading
    });

    switch (activeTab) {
      case "gratitude":
        return gratitudeComponent.input;
      case "breathing":
        return (
          <BreathingTask
            isBreathingActive={isBreathingActive}
            breathingTimeLeft={breathingTimeLeft}
            breathingProgress={breathingProgress}
            breathingCompleted={breathingCompleted}
            breathingPhase={breathingPhase}
            breathingCycle={breathingCycle}
            isSubmitting={isSubmitting}
            onStart={startBreathingExercise}
            onComplete={completeBreathingExercise}
            setBreathingCompleted={setBreathingCompleted}
          />
        );
      case "affirmation":
        return (
          <AffirmationTask
            affirmationText={affirmationText}
            isSubmittingAffirmation={isSubmittingAffirmation}
            affirmationCompleted={affirmationCompleted}
            onGenerateNew={fetchaffirmation}
            onMarkAsRead={handleAffirmationSubmit}
          />
        );
      default:
        return null;
    }
  };

  const renderBottomContent = () => {
    const gratitudeComponent = GratitudeTask({
      gratitudeText,
      setGratitudeText,
      hasSubmittedToday,
      isSubmitting,
      onSubmit: submitGratitudeEntry,
      gratitudeEntries,
      isLoading
    });

    switch (activeTab) {
      case "gratitude":
        return gratitudeComponent.entries;
      default:
        return (
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Coming Soon
            </h3>
            <p className="text-gray-400">
              This section will be available for {activeTab} activities.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="lg:h-screen h-full  p-6 ">
      {/* Header */}
      <div className=" max-w-7xl mx-auto mb-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Wellness Tasks</h1>
          <p className="text-gray-400">
            Nurture your mind, body, and spirit with daily practices
          </p>
        </div>

        {/* Navigation Tabs */}
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* UI Layout */}
      <div className="max-w-7xl mx-auto mb-10 ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:h-[600px]">
          {/* Left Column */}
          <div className="lg:col-span-1">
            <ProgressOverview
              completedTasks={completedTasks}
              streak={streak}
              totalGratitudeEntries={totalGratitudeEntries}
              totalBreathingSessions={totalBreathingSessions}
              totalaffirmationEntries={totalaffirmationEntries}
            />
          </div>

          {/* Right Column - Two Rows */}
          <div className="lg:col-span-2 flex flex-col overflow-y-scroll gap-6">
            {/* Top Row */}
            <div className={activeTab === "breathing" ? "h-full" : "flex-1"}>
              <div className="bg-[#272f3c] rounded-lg p-6 h-full border border-gray-600">
                {renderContent()}
              </div>
            </div>

            {/* Bottom Row - Only show for non-breathing tabs */}
            {activeTab !== "breathing" && activeTab !== "affirmation" && (
              <div className="flex-1 ">
                <div className="bg-[#272f3c] rounded-lg p-6 h-full border border-gray-600">
                  {renderBottomContent()}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
