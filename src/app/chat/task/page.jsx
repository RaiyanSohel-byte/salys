"use client";
import { TaskHome } from '@/components/Chat/Task/TaskHome';
import { useSubscription } from "@/providers/SubscriptionProvider";
import React from 'react';

const Page = () => {
  const { subscription } = useSubscription();
  if (subscription) {
    const currentDate = new Date();
    const subscriptionEndDate = new Date(subscription[0]?.end_date);
    const isActive = subscription[0]?.status === "active" && currentDate <= subscriptionEndDate;
    if (isActive) {
      return (
        <div className='py-5 lg:px-52'>
          <TaskHome/>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
          <div className="flex flex-col items-center bg-gradient-to-br from-blue-50 to-blue-200 rounded-2xl shadow-2xl p-10 border border-blue-200 max-w-md w-full animate-bounce-in">
            <svg className="mb-4 text-blue-500 animate-pulse" width="56" height="56" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="#e0e7ff" />
              <path d="M12 8v4" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="16" r="1" fill="#2563eb" />
            </svg>
            <h2 className="text-3xl font-extrabold mb-2 text-blue-900 tracking-wide drop-shadow">Subscription Required</h2>
            <p className="mb-1 text-blue-800 text-base text-center">Your subscription has expired or is inactive.</p>
            <p className="mb-2 text-blue-700 text-sm text-center">Please renew your membership to access the task features.</p>
          </div>
        </div>
      );
    }
  }
};

export default Page;
