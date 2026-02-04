import Login from "@/components/Login/Login";
import React from "react";

export const metadata = {
  title: "Login",
  description:
    "Access your Stelys account to explore personalized mental wellness tools, track progress, and connect with supportive resources.",
  keywords: [
    "Stelys login",
    "user login",
    "mental health platform access",
    "account login",
    "wellness dashboard",
    "secure login",
    "emotional support tools",
  ],
};

const page = () => {
  return (
    <div className="h-screen">
      <Login />
    </div>
  );
};

export default page;
