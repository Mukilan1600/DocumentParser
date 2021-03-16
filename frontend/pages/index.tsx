import Link from "next/link";
import Container from '../components/Container'
export default function Home() {
  return (
    <>
      <Container>
        <div className="w-max font-sans text-4xl font-medium">
          Document server
        </div>
        <div className="w-max font-sans font-medium">
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
        <div className="w-full rounded-md border-gray-500 p-2 border-2 flex flex-row justify-center text-sm">
          Project by:
          <span className="font-bold ml-2">
            Mukilan IK, Karthik Prasad T, Balaji N
          </span>
        </div>
      </Container>
    </>
  );
}
