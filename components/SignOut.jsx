"use client";

import { signOut } from "next-auth/react";

const SignOut = () => {
  return (
    <div className="flex justify-center">
      <button
        className="bg-gradient-to-r from-red-400 to-red-600 text-white font-bold px-6 py-2 rounded-full shadow hover:from-red-500 hover:to-red-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
        onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
      >
        Sign Out
      </button>
    </div>
  );
};

export default SignOut;
