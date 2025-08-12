import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();

  return (
    <div className="text-teal-600 text-3xl text-center my-5">
      <h1>Hello, I&apos;m here</h1>
      <Navbar session={session} />
      {session ? (
        <div>
          <p>Welcome, {session.user.name}!</p>
          <p>Email: {session.user.email}</p>
          <img
            src={session.user.image}
            alt="User Image"
            className="rounded-full w-24 h-24 mx-auto"
          />
        </div>
      ) : (
        <p>Not signed in</p>
      )}
    </div>
  );
}
