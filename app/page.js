import { getServerSession } from "next-auth";
import SignOutPage from "./auth/signout/page";
import { authOptions } from "@/lib/nextAuth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen w-full">
      Go to <a className=" cursor-pointer rounded-xl bg-gray-800 text-white p-3" href="/auth/signin">Sign In</a> page to authenticate.
      <br />
      Go to <a className=" cursor-pointer rounded-xl bg-gray-800 text-white p-3" href="/profile">Profile</a> page to see your profile.
      <br />
      {session?.user && <SignOutPage /> }
      
    </div>
  )}
