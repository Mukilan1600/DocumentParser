import "tailwindcss/tailwind.css";
import Head from "next/head";
import { SWRConfig } from "swr";

import Nav from "../components/Nav";

const fetcher = (url) =>
  fetch(url, { credentials: "include" }).then((res) => res.json());

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig value={{
      fetcher: fetcher
    }}>
      <div className="bg-gray-100 h-screen">
        <Head>
          <title>Document parser</title>
        </Head>
        <Nav />
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}

export default MyApp;
