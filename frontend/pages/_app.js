import "tailwindcss/tailwind.css";
import Head from "next/head";

import Nav from "../components/Nav";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Document parser</title>
      </Head>
      <Nav />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
