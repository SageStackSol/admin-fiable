
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export default function Navbar() {
  const pathname = usePathname();

  const tabs = ["/contacts", "/projects"];
  const index = tabs.indexOf(pathname);

  return (
    <div className="w-screen bg-white ">
 <div className="w-screen flex justify-between items-center p-4 bg-white ">
        <img src="/3d-logo.png" className="w-24"/>
 <div className="relative flex bg-[#ffc800]/60 rounded-2xl overflow-hidden w-fit text-[#002f67] font-medium">

      {/* 🔥 Moving background (NO GAP) */}
      <div
        className="absolute top-0 left-0 h-full w-1/2 rounded-2xl bg-yellow-400 transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(${index * 100}%)`,
        }}
      />

      {/* Links */}
      <Link href="/contacts" className="flex-1 text-center z-10 py-1 px-4">
        Contacts
      </Link>

      <Link href="/projects" className="flex-1 text-center z-10 py-1 px-4">
        Projects
      </Link>
    </div>
    <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        // style={{
        // //   marginTop: "20px",
        //   padding: "10px 20px",
        //   background: "red",
        //   color: "white",
        // }}
        className="px-4 py-1 bg-[#002f67] text-[#ffc800] rounded-2xl hover:cursor-pointer"
      >
        Logout
      </button>
    </div>

    </div>
   
   
  );
}