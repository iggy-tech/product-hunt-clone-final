import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
    return ( <div>
            <div className="flex justify-center  h-screen w-full bg-gray-100">
      <div className="text-center flex py-40 items-center flex-col ">
        <Link href="/">
          <Image
            priority
            src="/logo/logo.png"
            alt="404"
            width={500}
            height={500}
            className="w-40  border-gray-200 rounded-md  hover:cursor-pointer"
          />
        </Link>

        <div className="text-3xl font-bold">
          Ooops! Looks like something went wrong
        </div>
        <div className="text-lg text-gray-600">
          The page you are looking for does not exist
        </div>

        <Link
          href="/"
          className="bg-[#ff6154] text-white px-4 py-2 rounded-md mt-4"
        >
          Home Page
        </Link>
      </div>
    </div>
    </div> );
}
 
export default NotFound;