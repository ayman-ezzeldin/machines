import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextAuth";
import SignOut from "@/components/SignOut";
import Navbar from "@/components/Navbar";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="h-[90vh] bg-white px-1">
      <main className="flex flex-col items-center justify-center min-h-[70vh] px-4">
        <div className="bg-white/80 rounded-2xl shadow-xl p-10 max-w-xl w-full flex flex-col items-center">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-4 text-center">
            Welcome to MachinesApp
          </h1>
          <p className="text-lg text-gray-700 mb-8 text-center">
            Manage your machines and tasks efficiently.
            <br />
            {session?.user
              ? `Hello, ${session.user.name || session.user.email}!`
              : "Sign in to get started."}
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-6">
            {!session?.user && (
              <a
                href="/auth/signin"
                className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow transition"
              >
                Sign In
              </a>
            )}
            <a
              href="/machines"
              className="bg-white border cursor-pointer border-blue-600 text-blue-700 font-bold py-2 px-6 rounded-lg shadow hover:bg-blue-50 transition"
            >
              View Machines
            </a>
            <a
              href="/tasks"
              className="bg-white border cursor-pointer border-blue-600 text-blue-700 font-bold py-2 px-6 rounded-lg shadow hover:bg-blue-50 transition"
            >
              View Tasks
            </a>
            {session?.user && (
              <a
                href="/profile"
              className="bg-white border cursor-pointer border-blue-600 text-blue-700 font-bold py-2 px-6 rounded-lg shadow hover:bg-blue-50 transition"
              >
                Profile
              </a>
            )}
          </div>
          {session?.user && <SignOut />}
        </div>
      </main>
    </div>
  );
}
