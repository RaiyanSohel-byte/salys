import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div>
      <div className="h-[800px] mx-auto text-white bg-gradient-to-r from-[#2b2440] via-[#336a7f] to-[#1f353f]">
        <div className="flex justify-center items-center pt-28 lg:pt-0">
          <button className="bg-[#2D2D2D] text-[20px] text-[#4FE4FE] rounded-[50px] px-[20px] py-[2px] mt-6 lg:mt-32">
            Mental Health Care
          </button>
        </div>
        <p className="mt-[40px] text-3xl lg:text-[60px] text-center font-bold">
          Accessible AI, <br />
          <span className="italic font-playfair text-[#4FE4FE]">
            Inspired by ChatGPT
          </span>
        </p>
        <p className=" mt-9 lg:mt-[30px] text-center text-[#D0E0FF] text-2xl px-2 lg:px-0 ">
          Designed for people with disabilities, chronic illness, and <br />{" "}
          anyone who needs a calmer AI experience.
        </p>
        <div className="flex justify-center">
          <Link
            href={"/chat"}
            className="bg-[#4FE4FE] text-black font-medium rounded-[38px] py-[10px] px-[20px] outline-none lg:mt-4 mt-14 mb-14 hover:bg-sky-500"
          >
            Try STELYS Chat
          </Link>
        </div>
        <div className="flex justify-center px-4 lg:mt-0">
          <div className="w-[510px] py-2 bg-[#FFFF] rounded-[9999px] text-[#686F7D] font-bold flex gap-4 items-center mt-[30px] ">
            <div className="flex ml-4">
              <Image
                className="rounded-full"
                src="/project-image/1.jpg"
                alt="profile"
                width={30}
                height={30}
              />
              <Image
                className="rounded-full"
                src="/project-image/2.jpg"
                alt="profile"
                width={30}
                height={30}
              />
              <Image
                className="rounded-full"
                src="/project-image/3.jpg"
                alt="profile"
                width={30}
                height={30}
              />
            </div>

            <div className="text-xl ">
              Trusted by <span className="text-[#9D50FF]">1,000+</span> self
              changers.
            </div>
          </div>
        </div>
      </div>
      {/*Marquary Tag*/}
    </div>
  );
};

export default Header;
