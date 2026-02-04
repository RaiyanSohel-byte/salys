"use client";
import React, { useState, useEffect } from "react";
import DesktopNav from "./DesktopNav";
import { RiMenu4Line } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import MobileNav from "./MobileNav";
import ProfileDialog from "@/components/Profile/ProfileDialog";

const Nav = () => {
  const [isOpened, setIsOpened] = useState(false);
  const toggleOpen = () => {
    setIsOpened(!isOpened);
  };
  return (
    <>
      <DesktopNav className="hidden lg:block" />

      <div className=" block lg:hidden ">
        <div className=" flex py-2 items-center justify-between px-4 w-screen bg-[#081335] text-white ">
          <RiMenu4Line onClick={toggleOpen} size={24} />
          <h1
            className=" text-xl text"
            style={{ fontFamily: "lemon, sans-serif" }}
          >
            Stelys
          </h1>
          <div></div>
        </div>

        <div>
          <MobileNav isOpened={isOpened} toggleOpen={toggleOpen} />
        </div>
      </div>
    </>
  );
};

export default Nav;
