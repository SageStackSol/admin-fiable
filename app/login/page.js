"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // background: "#0f172a",
        // color: "white",
      }}
    >
        {/* <p className=" bg-red-900">hwejhbvcde</p> */}
      <div
        // style={{
        //   padding: "40px",
        //   borderRadius: "12px",
        //   background: "#111827",
        //   textAlign: "center",
        //   width: "320px",
        //   boxShadow: "0 0 20px rgba(0,0,0,0.4)",
        // }}
        className=" p-12 grid grid-cols-2 w-[80vw] items-center gap-12"
      >
        <img src="/logo.png" alt="logo" className=""/>
        <div className="text-[#002f67]">
 <h1 className="text-center font-bold text-3xl ">Admin Login</h1>
        <p className="text-[#9ca3af] text-center">
          Sign in with your Google account
        </p>

        <button
          onClick={() => signIn("google")}
         
          className="bg-[#ffc800] mt-5 w-full p-3 rounded hover:cursor-pointer font-bold"
        >
          Continue with Google
        </button>
        </div>
       
      </div>
    </div>
  );
}