import "tailwindcss/tailwind.css";
import Head from "next/head";
import Body from "next"

import Nav from "../components/Nav";

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-gray-100 h-screen">
      <Head>
        <title>Document parser</title>
      </Head>
      <Nav />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
