import { GetServerSideProps } from "next";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import Container from "../components/Container";
import useUser from "../components/Stores/useUser";

import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Login() {
  const { mutateUser } = useUser({
    redirectTo: "/home",
    redirectIfFound: true,
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const onValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "username") setUsername(event.target.value);
    else setPassword(event.target.value);
  };

  const onLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username.length < 1 || password.length < 1) {
      setError("Please enter all the fields");
      return;
    } else {
      setError("");
    }
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_SERVER_END_POINT}/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.status === 401) setError(data.msg);
        else {
          mutateUser(data.user);
        }
      })
      .catch((err) => {
        setError("Invalid username or password");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container>
      <h1 className="text-4xl font-medium">Login</h1>
      <form onSubmit={onLogin} className="w-full">
        <div className="space-y-2 w-full">
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
            <Link href="/register">
              <a className="text-blue-500 hover:underline focus:outline-none focus:underline">
                Don't have an account?
              </a>
            </Link>
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-800 focus:outline-none focus:bg-blue-800 rounded-lg border-2 w-full h-12 text-center text-white"
            >
              Login
              <FontAwesomeIcon icon={faSpinner} className={`ml-2 animate-spin ${!loading&&"invisible"}`}/>
            </button>
          </div>
          <div
            className={`h-8 rounded-md text-red-700 flex items-center px-2 bg-red-300 border border-red-700 ${
              error.length < 1 ? "invisible" : null
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
