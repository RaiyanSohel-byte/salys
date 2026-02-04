import Signup from "@/components/Signup/Signup";
import React from "react";

export const metadata = {
  title: "Sign Up",
  description:
    "Create your Stelys account to begin your journey toward better emotional well-being with personalized tools, expert resources, and a supportive community.",
  keywords: [
    "Stelys sign up",
    "create account",
    "register Stelys",
    "mental health signup",
    "wellness platform registration",
    "join Stelys",
    "emotional support tools",
  ],
};

const page = () => {
  return (
    <div>
      <Signup />
    </div>
  );
};

export default page;
