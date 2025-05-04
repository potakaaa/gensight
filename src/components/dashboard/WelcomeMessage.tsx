import React from "react";
import Header from "@/components/header/Header";
import Image from "next/image";

const WelcomeMessage = () => {
  return (
    <section
      id="welcome-container"
      className="w-full flex flex-row justify-between items-start px-10 py-12 text-white bg-[#4268FB] rounded-2xl shadow-md gap-1 relative overflow-hidden"
    >
      <section className="flex flex-col gap-1">
        <h3 className="text-4xl font-medium">
          Welcome, <i>Juan</i>
        </h3>
        <p className="font-light text-sm">
          Below are some of the tools that our service has to offer
        </p>
      </section>
      <Image
        src={"/logo1.png"}
        height={270}
        width={270}
        alt="Gensight Logo"
        className="absolute right-20 -top-8 invert brightness-0 opacity-20"
      />
    </section>
  );
};

export default WelcomeMessage;
