import React from "react";
import { Button } from "../ui/button";
import { Bell } from "lucide-react";

const NotificationButton = () => {
  return (
    <Button size="lg" variant={"ghost"} className="p-3 [&_svg]:size-6">
      <Bell className="size-7 text-[#333333]" />
    </Button>
  );
};

export default NotificationButton;
