import Link from "next/link";
export default function Home() {
  return (
    <>
      <div className="lg:mx-auto lg:max-w-5xl md:shadow-md p-5 mt-5 flex flex-col md:space-y-10 space-y-5 items-center">
        <div className="w-max font-sans text-6xl font-medium">
          Document server
        </div>
        <div className="w-max font-sans text-lg font-medium">
          Parse your documents at ease
        </div>
        <div className="flex flex-row justify-center space-x-8 w-full">
          <Link href="/login">
            <a className="w-28 h-10 p-2 bg-red-500 focus:bg-red-700 hover:bg-red-700 text-white text-center rounded-md">Login</a>
          </Link>
          <Link href="/register">
            <a className="w-28 h-10 p-2 bg-green-500 focus:bg-green-700 hover:bg-green-700 text-white text-center rounded-md">Register</a>
          </Link>
        </div>
        <div className="w-max rounded-md border-gray-500 p-3 border-2">
          Project done by:
          <span className="font-bold ml-2">
            Mukilan IK, Karthik Prasad T, Balaji N
          </span>
        </div>
      </div>
    </>
  );
}
