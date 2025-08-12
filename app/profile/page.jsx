import { authOptions } from '@/lib/nextAuth';
import { getServerSession } from 'next-auth';
import Image from 'next/image';

const page = async () => {
const session = await getServerSession(authOptions);

  return (
    <div className="text-teal-600 text-3xl text-center my-5">
      <h1>Hello, I&apos;m here: </h1>
      {session ? (
        <div>
          <p>Welcome, {session.user.name}!</p>
          <p>Email: {session.user.email}</p>
          <Image
            src={session.user.image}
            alt="User Image"
            width={96}    
            height={96}     
            className="rounded-full w-24 h-24 mx-auto"
          />
        </div>
      ) : (
        <p>Not signed in</p>
      )}
    </div>
  );
}

export default page