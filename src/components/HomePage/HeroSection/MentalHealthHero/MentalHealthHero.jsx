import Image from "next/image";
import React from "react";

const MentalHealthHero = () => {
  return (
    <div className=" bg-black px-6">
      <marquee className="mt-[20px]">
        <div className="flex gap-8 text-[#9D50FFCC] text-xl font-bold justify-center">
          <li>CHILD COUNSELLING</li>
          <li>FAMILY COUNSELLING</li>
          <li>INDIVIDUAL COUNSELLING</li>
          <li>CHILD COUNSELLING</li>
          <li>COUPLE COUNSELLING</li>
          <li>FAMILY COUNSELLING</li>
          <li>CHILD COUNSELLING</li>
          <li>INDIVIDUAL COUNSELLING</li>
          <li>CHILD COUNSELLING</li>
          <li>COUPLE COUNSELLING</li>
          <li>CHILD COUNSELLING</li>
          <li>FAMILY COUNSELLING</li>
          <li>INDIVIDUAL COUNSELLING</li>
          <li>CHILD COUNSELLING</li>
          <li>COUPLE COUNSELLING</li>
          <li>FAMILY COUNSELLING</li>
          <li>CHILD COUNSELLING</li>
          <li>INDIVIDUAL COUNSELLING</li>
          <li>CHILD COUNSELLING</li>
          <li>COUPLE COUNSELLING</li>
          <li>CHILD COUNSELLING</li>
          <li>FAMILY COUNSELLING</li>
          <li>INDIVIDUAL COUNSELLING</li>
          <li>CHILD COUNSELLING</li>
          <li>COUPLE COUNSELLING</li>
          <li>FAMILY COUNSELLING</li>
          <li>CHILD COUNSELLING</li>
          <li>INDIVIDUAL COUNSELLING</li>
          <li>CHILD COUNSELLING</li>
          <li>COUPLE COUNSELLING</li>
        </div>
      </marquee>
      <hr className="bg-[#9D50FFCC] h-[1px] border-none mt-4" />
      <div className="flex justify-center mt-24">
        <h1 className="text-white border border-white rounded-sm w-32 text-center">
          How We Work
        </h1>
      </div>
      <h1 className="text-center text-white font-bold text-4xl mt-8">
        How
        <span className="italic font-playfair text-[#9D50FF]"> STELYS </span>
        Chat Works
      </h1>
      {/*Card*/}
      <div className="mt-[60px] lg:flex lg:gap-6 justify-center">
        <div className=" text-white lg:w-[424px] h-[267px] hover:text-black py-11 px-6 border-1 border-[#76A6FF] hover:bg-[#76A6FF] rounded-xl text-center transition duration-300 mb-2">
          <h1 className="font-bold text-xl">Step 1</h1>
          <h1 className="font-bold text-xl mt-7 mb-5">Sign in securely</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur. Euismod sit et arcu amet sed
            ultrices quam.
          </p>
        </div>
        <div className=" text-white lg:w-[424px] h-[267px] hover:text-black py-11 px-6 border-1 border-[#76A6FF] hover:bg-[#76A6FF] rounded-xl text-center transition duration-300 mb-2">
          <h1 className="font-bold text-xl">Step 2</h1>
          <h1 className="font-bold text-xl mt-7 mb-5">
            Set your comfort preferences
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur. Euismod sit et arcu amet sed
            ultrices quam.
          </p>
        </div>
        <div className=" text-white lg:w-[424px] h-[267px] hover:text-black py-11 px-6 border-1  rounded-xl text-center  border-[#76A6FF] hover:bg-[#76A6FF] transition duration-300">
          <h1 className="font-bold text-xl">Step 3</h1>
          <h1 className="font-bold text-xl mt-7 mb-5">
            Chat your way—text or voice
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur. Euismod sit et arcu amet sed
            ultrices quam.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MentalHealthHero;
