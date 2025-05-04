"use client";

import React from "react";
import ProfileButton from "./ProfileButton";
import NotificationButton from "./NotificationButton";
import { usePathname } from "next/navigation";

const routeToPageTitle = (pathname: string) => {
  const map: Record<string, string> = {
    "/": "Dashboard",
    "/family-tree": "Family Tree",
    "/profile": "Profile Page",
    // Add more mappings as needed
  };

  return (
    map[pathname] ||
    pathname
      .replace("/", "")
      .replace("-", " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())
  );
};

const Header = () => {
  const pathname = usePathname();
  const page = routeToPageTitle(pathname);
  return (
    <section
      id="header-container"
      className="w-full flex justify-between items-center"
    >
      <h1 className="text-3xl font-medium">{page}</h1>
      <section className="flex flex-row items-center gap-4">
        <ProfileButton />
        <NotificationButton />
      </section>
    </section>
  );
};

export default Header;
