import { authOptions } from "@/lib/nextAuth";
import { getServerSession } from "next-auth";
import Image from "next/image";

const page = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white px-3">
      <div className="bg-white/90 rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-4">Profile</h1>
        {session ? (
          <div>
            <Image
              src={session.user.image}
              alt="User Image"
              width={96}
              height={96}
              className="rounded-full mx-auto mb-4 border-4 border-blue-200 shadow"
            />
            <p className="text-xl font-semibold text-gray-800 mb-2">
              {session.user.name}
            </p>
            <p className="text-gray-600 mb-4">{session.user.email}</p>
            <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              Signed in
            </span>
          </div>
        ) : (
          <p className="text-gray-600">Not signed in</p>
        )}
      </div>
    </div>
  );
};

export default page;
