import Image from "next/image";
import React from "react";
import { MdOutlineStar } from "react-icons/md";

const About_Us = () => {
  return (
    <div className="bg-black px-4 lg:px-0">
      <div className="h-[532px] mx-auto bg-gradient-to-r from-[#2b2440] via-[#336a7f] to-[#1f353f]">
        <p className=" text-3xl lg:text-[60px] text-center font-serif font-bold text-white pt-20 mb-16">
          Redefining AI <br />
          <span className="text-[#4FE4FE] italic font-playfair">
            {" "}
            for Everyone
          </span>
        </p>
        <p className=" text-center text-white text-2xl">
          We focus on people first — especially those with disabilities, <br />{" "}
          chronic illness, or sensory overload — to create technology that truly
          adapts to you. <br /> We’re building a calmer, more accessible AI
          experience for people with disabilities, <br /> chronic illness, and
          anyone who deserves technology that feels supportive, not
          overwhelming.
        </p>
      </div>

      {/*Photo section*/}
      <div className=" mt-[500px] lg:mt-32 lg:flex gap-14 justify-center items-start">
        <div className="bg-[#9D50FF] lg:w-[536px] lg:h-[500px] rounded-xl relative">
          <Image
            className="absolute lg:right-8 bottom-8"
            src="/project-image/about.png"
            alt="profile"
            width={550}
            height={550}
          />
        </div>

        <div className="lg:w-[702px]">
          <div className="mb-2">
            <h1 className="text-white border border-white rounded-sm w-32 text-center font-semibold">
              Our Story
            </h1>
          </div>
          <h1 className="text-2xl lg:text-5xl font-semibold mb-2 text-white">
            From isolation to{" "}
            <span className="italic font-playfair text-[#9D50FF]">
              intelligent
            </span>{" "}
            connection
          </h1>
          <p className="px-1 lg:px-0 text-justify text-white">
            You're not alone you're just one conversation away from support. Our
            intelligent therapy companion is built to understand, guide, and
            empower you every day. From managing anxiety and stress to exploring
            personalized therapy paths, we bridge the gap between mental health
            struggles and meaningful solutions. Start your journey toward
            clarity, confidence, and calm — all in one place. Whether you're
            dealing with burnout, emotional overwhelm, loneliness, or
            uncertainty, our platform offers a safe space to be heard and
            supported. With 24/7 AI-powered conversations, daily mental health
            check-ins, and progress tracking, we ensure that you're never
            navigating your healing alone. Let this be the start of a better you
            grounded, understood, and cared for.
          </p>
        </div>
      </div>

      <div>
        <div className="mb-2 mt-28 flex justify-center">
          <h1 className="text-white border border-white rounded-sm text-center font-semibold py-1 px-4">
            What People Say
          </h1>
        </div>
        <h1 className="text-4xl font-semibold text-center mt-7 text-white">
          Every session matters. Every story counts. <br /> Experience{" "}
          <span className="text-[] font-semibold italic">safespace</span>{" "}
          impact.
        </h1>
        {/*Card*/}
        <div className="mt-[60px] lg:flex lg:gap-6 justify-center py-28">
          <div className="lg:w-[424px] h-[300px] py-11 px-6 border-1 border-[] rounded-xl text-center bg-[#76A6FF] transition duration-300 mb-2">
            <Image
              src="/project-image/ratting1.png"
              alt="profile"
              width={50}
              height={50}
              className="mx-auto"
            />
            <h1 className="font-bold text-xl mt-5 mb-3">Robert Fox</h1>
            {/*Star Icon*/}
            <div className="flex justify-center mb-3">
              <MdOutlineStar className="text-xl text-[]" />
              <MdOutlineStar className="text-xl text-[]" />
              <MdOutlineStar className="text-xl text-[]" />
              <MdOutlineStar className="text-xl text-[]" />
              <MdOutlineStar className="text-xl text-[]" />
            </div>
            <p>
              I never thought talking to an AI could actually help me feel
              heard. The 24/7 support helped me through some of my most anxious
              nights.
            </p>
          </div>
          <div className="lg:w-[424px] h-[300px] py-11 px-6 border-1 border-[#76A6FF] rounded-xl text-center bg-[#76A6FF] transition duration-300 mb-2">
            <Image
              src="/project-image/ratting2.png"
              alt="profile"
              width={50}
              height={50}
              className="mx-auto"
            />
            <h1 className="font-bold text-xl mt-5 mb-3">Devon Lane</h1>
            {/*Star Icon*/}
            <div className="flex justify-center mb-3">
              <MdOutlineStar className="text-xl text-[]" />
              <MdOutlineStar className="text-xl text-[]" />
              <MdOutlineStar className="text-xl text-[]" />
              <MdOutlineStar className="text-xl text-[]" />
              <MdOutlineStar className="text-xl text-[]" />
            </div>
            <p>
              During a panic attack, I opened the app and used the voice chat.
              The AI guided me through calming exercises in real time. It truly
              felt life-saving
            </p>
          </div>
          <div className="lg:w-[424px] h-[300px] py-11 px-6 border-1 border-[#C5E2C5] rounded-xl text-center bg-[#76A6FF] transition duration-300">
            <Image
              src="/project-image/ratting3.png"
              alt="profile"
              width={50}
              height={50}
              className="mx-auto"
            />
            <h1 className="font-bold text-xl mt-5 mb-3">Courtney Henry</h1>
            {/*Star Icon*/}
            <div className="flex justify-center mb-3">
              <MdOutlineStar className="text-xl text-[]" />
              <MdOutlineStar className="text-xl text-[]" />
              <MdOutlineStar className="text-xl text-[]" />
              <MdOutlineStar className="text-xl text-[]" />
              <MdOutlineStar className="text-xl text-[]" />
            </div>
            <p>
              This isn’t just a chatbot. It’s a space where I unpack years of
              emotional baggage without fear of judgment. The AI adapts to my
              pace and progress.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About_Us;
