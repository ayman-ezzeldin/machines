"use client";

import { signOut } from "next-auth/react";

const SignOutPage = () => {
  return (
    <div>
      <button className=" text-teal-700 font-bold cursor-pointer bg-gray-400 p-3 rounded-xl" 
      onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
      >SignOut</button>
    </div>
  )
}

export default SignOutPage