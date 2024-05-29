import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

const AuthContent = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <Image
        src={"/logo/small-logo.png"}
        alt="logo"
        width={200}
        height={200}
        className="p-10"
      />

      <div className="flex flex-col items-center justify-center text-center">
        <div className="text-2xl font-medium py-4">
          See what&apos;s new in tech
        </div>
        <div className="text-md text-gray-600 w-4/5 mx-auto">
          Join our community of friendly folks discovering and sharing the
          latest product in tech
        </div>
      </div>

      <button 
            onClick={() => signIn("google", { redirect: false })}
      
      className="border rounded-md py-2 mt-4 flex items-center gap-4 px-10">
        <FcGoogle className="text-xl" />
        Sign in with Google
      </button>

      <button 
     onClick={() => signIn("github", { redirect: false })}
      
      className="border rounded-md py-2 mt-4 flex items-center gap-4 px-10">
        <FaGithub className="text-xl text-purple-800" />
        Sign in with Github 
      </button>
    </div>
  );
};

export default AuthContent;
