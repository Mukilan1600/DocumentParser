import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";

interface useUserProps {
  redirectTo?: string;
  redirectIfFound?: boolean;
}

interface User {
  name: string;
  username: string;
  files: [string];
}

export default function useUser({
  redirectTo,
  redirectIfFound = false,
}: useUserProps) {
  const { data, mutate: mutateUser } = useSWR(
    "http://localhost:8000/api/user/authenticate"
  );
  const user = data as User | null;
  useEffect(() => {
    if (!redirectTo && !user) return;

    if (
      (redirectTo && !redirectIfFound && !user) ||
      (redirectTo && redirectIfFound && user)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  const logout = () => {
    fetch("http://localhost:8000/api/user/logout", {
      credentials: "include",
    }).then(() => {
      mutateUser(null);
      Router.push("/login");
    });
  };

  return { user, mutateUser, logout };
}
