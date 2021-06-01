import Head from "next/head";
import ThemeContainer from "../contexts/theme/ThemeContainer";
import Router from "next/router";
import NProgress from "nprogress";

Router.events.on("routeChangeStart", (url) => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <ThemeContainer>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <title>Stokei</title>

        <link rel="shortcut icon" href="/favicon.png" />

        {/* Import CSS for nprogress */}
        <link rel="stylesheet" type="text/css" href="/nprogress.css" />
      </Head>
      <Component {...pageProps} />
    </ThemeContainer>
  );
}

export default MyApp;
