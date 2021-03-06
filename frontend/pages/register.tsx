import { GetServerSideProps } from "next";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import Container from "../components/Container";
import useUser from "../components/Stores/useUser";

export default function Register() {
  const { mutateUser } = useUser({
    redirectTo: "/home",
    redirectIfFound: true,
  });
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const onValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "username") setUsername(event.target.value);
    else if (event.target.name === "password") setPassword(event.target.value);
    else setName(event.target.value);
    setError("")
    setMsg("")
  };

  const onLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username.length < 1 || password.length < 1 || name.length < 1) {
      setError("Please enter all the fields");
      return;
    } else {
        setError("");
    }
    setMsg("")

    fetch(`${process.env.NEXT_PUBLIC_SERVER_END_POINT}/api/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ name, username, password }),
    })
      .then(async (res) => {
          const data = await res.json();
          if(res.status === 409){
              setError(data.msg)
              return
          }
        mutateUser(data.user);
        setMsg("Successfully registered. Please login");
      })
      .catch((err) => {
        setError("Internal server error");
      });
  };

  return (
    <Container>
      <h1 className="text-4xl font-medium">Register</h1>
      <form onSubmit={onLogin} className="w-full">
        <div className="space-y-2 w-full">
          <div className="flex flex-col space-y-1 w-full">
            <label htmlFor="name">Name</label>
            <input
              className={`w-full focus:${
                name.length > 0 ? "border-green-500" : "border-red-500"
              } focus:outline-none border-gray-500 h-10 border-b p-1`}
              type="text"
              id="name"
              name="name"
              placeholder="Enter name"
              value={name}
              onChange={onValueChange}
            />
          </div>
          <div className="flex flex-col space-y-1 w-full">
            <label htmlFor="username">Username</label>
            <input
              className={`w-full focus:${
                username.length > 0 ? "border-green-500" : "border-red-500"
              } focus:outline-none border-gray-500 h-10 border-b p-1`}
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
              value={username}
              onChange={onValueChange}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="password">Password</label>
            <input
              className={`w-full focus:${
                password.length > 0 ? "border-green-500" : "border-red-500"
              } focus:outline-none border-gray-500 h-10 border-b p-1`}
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={onValueChange}
            />
          </div>
          <div>
            <Link href="/login">
              <a className="text-blue-500 hover:underline focus:outline-none focus:underline">
                Already have an account?
              </a>
            </Link>
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-800 focus:outline-none focus:bg-blue-800 rounded-lg border-2 w-full h-12 text-center text-white"
            >
              Register
            </button>
          </div>
          <div
            className={`h-8 rounded-md text-green-700 flex items-center px-2 bg-green-300 border border-green-700 ${
              msg.length < 1
                ? error.length < 1
                  ? "invisible"
                  : "hidden"
                : null
            }`}
          >
            {msg}
          </div>
          <div
            className={`h-8 rounded-md text-red-700 flex items-center px-2 bg-red-300 border border-red-700 ${
              error.length < 1 ? "hidden" : null
            }`}
          >
            {error}
          </div>
        </div>
      </form>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  var cookies = "";
  Object.keys(req.cookies).forEach((key, i) => {
    cookies += (i > 0 ? "; " : "") + key + "=" + req.cookies[key];
  });
  var res = await fetch("http://localhost:8000/api/user/authenticate", {
    headers: { cookie: cookies },
    credentials: "include",
  });

  if (res.status !== 401) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }
  return { props: {} };
};
