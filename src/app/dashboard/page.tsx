import WelcomeMessage from "@/components/dashboard/WelcomeMessage";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { BookUser, Clock2 } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div
      id="main-container"
      className="w-full flex flex-col items-center gap-5"
    >
      <WelcomeMessage />
      <div
        id="dashboard-container"
        className="w-full flex flex-row items-center gap-5"
      >
        <section id="actions-container" className="flex-[2]">
          <div className="w-full flex flex-col bg-white shadow-md">
            <p></p>
          </div>
        </section>

        <section id="profile-container" className="flex-[1]">
          <div className="w-full flex flex-col gap-7 bg-white rounded-2xl py-8 px-10 shadow-md h-[620px]">
            <p className="font-semibold">User Profile</p>
            <Avatar className="w-20 h-20">
              <AvatarFallback className="bg-gradient-to-b from-[#4268FB] to-[#FFFFFF] shadow-md size-44" />
              <AvatarImage src={"image.png"} />
            </Avatar>
            <section className="flex flex-col">
              <h3 className="text-xl font-medium">Juan Dela Cruz</h3>
              <p className="text-sm">Full Name</p>
            </section>
            <p className="text-sm font-bold">Details</p>
            <section className="flex flex-col gap-1">
              <BookUser className="size-12 text-[#272F5D]" strokeWidth={1.3} />
              <p className="text-sm mt-2">Relationship Role</p>
              <h3 className="text-sm font-medium">Parent</h3>
            </section>
            <section className="flex flex-col gap-1">
              <Clock2 className="size-12 text-[#272F5D]" strokeWidth={1.3} />
              <p className="text-sm mt-2">Last Login</p>
              <h3 className="text-sm font-medium line-clamp-2 w-40">
                10:25 AM UTF+8 at August 14, 2024
              </h3>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
};

export default page;
