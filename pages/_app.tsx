import "../styles/globals.css";
import { Provider } from "../store/context";
import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import NProgress from "../components/NProgress";

const check = () => typeof window !== "undefined";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  if (router.asPath !== `/photos/${router.query.id}` && check()) {
    document.body.style.overflow = "visible";
  }

  const allProps = {
    rel: "preload",
    href: "https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap",
    as: "style",
    onload: "this.onload=null;this.rel='stylesheet'",
  };

  const latoProps = {
    rel: "preload",
    href: "https://fonts.googleapis.com/css2?family=Lato:wght@200;300;400;500;600;700;800&display=swap",
    as: "style",
    onload: "this.onload=null;this.rel='stylesheet'",
  };

  return (
    <>
      <Head>
        <title>Unsplash</title>
        <meta name="description" content="Unsplash Clone" />

        {/* <link {...allProps} />

<link {...latoProps} /> */}
      </Head>
      <Provider>
        <Component {...pageProps} />
        <NProgress />
      </Provider>
    </>
  );
}

export default MyApp;
