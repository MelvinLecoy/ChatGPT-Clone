"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import LoginBg from "../images/LoginPage.png";

function Login() {
  return (
    <div className="bg-[#11A37F] h-screen flex flex-col items-center justify-center text-center">
      <Image src={LoginBg} width={300} height={300} alt="logo"/>
      <button onClick={() => signIn("google")} className="text-white font-bold text-3xl animate-pulse">Sign in for exclusive ChatGPT</button>
    </div>
  )
}

export default Login;