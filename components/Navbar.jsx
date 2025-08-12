"use client";
import { signIn, signOut } from "next-auth/react";

export default function Navbar({session}) {
  return (
    <div>
        <button type="button"
      className="bg-teal-600 text-white px-4 py-2 rounded-md cursor-pointer mb-3"
      onClick={() => signIn('google')} >Sign In with google</button>
      <p className="text-teal-800" >{session?.user?.name }</p>
      <button className="bg-teal-600 text-white px-4 py-2 rounded-md cursor-pointer"
      onClick={() => signOut('google')}
      >Sign Out</button>
    </div>
  );
};
