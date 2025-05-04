import React from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const ProfileButton = () => {
  return (
    <Button variant={"ghost"} className="p-0 rounded-full">
      <Avatar>
        <AvatarFallback className="bg-gradient-to-tr from-[#4268FB] to-[#FFFFFF] shadow-md" />
        <AvatarImage src={"image.png"} />
      </Avatar>
    </Button>
  );
};

export default ProfileButton;
