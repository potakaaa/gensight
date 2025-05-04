import {
  ChartLine,
  LayoutGrid,
  LogOut,
  Network,
  SquareStack,
  UserRoundCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SideBar() {
  return (
    <>
      <div className="flex flex-col w-1/5 h-screen border-r-2 border-gray-200 p-6">
        <div className="flex items-center h-16 gap-4">
          <Image src={"/favicon.svg"} alt="Logo" width={50} height={50} />
          <h1 className="text-xl font-bold text-[#4268fb]">Gensight</h1>
        </div>
        <div className="flex flex-col justify-between h-full px-4 py-4 pt-8 ">
          <div className="flex flex-col gap-y-8 text-gray-700">
            <div className="flex gap-4 items-center">
              <LayoutGrid className="min-w-5" />
              <Link href="/dashboard" className="text-sm font-medium">
                Dashboard
              </Link>
            </div>
            <div className="flex gap-4 items-center">
              <UserRoundCheck className="min-w-5" />
              <Link href="profile" className="text-sm font-medium">
                Profile
              </Link>
            </div>
            <div className="flex gap-4 items-center">
              <Network className="min-w-5" />
              <Link href="/family-tree" className="text-sm font-medium">
                Family Tree
              </Link>
            </div>
            <div className="flex gap-4 items-center">
              <SquareStack className="min-w-5" />
              <Link href="/health-history" className="text-sm font-medium">
                Health History
              </Link>
            </div>
            <div className="flex gap-4 items-center">
              <ChartLine className="min-w-5" />
              <Link href="/risk-analysis" className="text-sm font-medium">
                Risk Analysis
              </Link>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <LogOut color="#ef4444" />
            <Link href="/logout" className="text-sm font-medium text-red-500">
              Logout
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
