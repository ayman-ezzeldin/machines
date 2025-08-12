"use client"
import { signIn } from "next-auth/react"

const page = () => {
  return (
    <div className=" flex justify-center items-center h-screen" >
      <button className=" text-teal-700 font-bold cursor-pointer bg-gray-400 p-3 rounded-xl"
        onClick={()=> signIn('google',{redirect: true, callbackUrl: '/profile'})}
      >Sign In with Google</button>
    </div>
  )
}

export default page