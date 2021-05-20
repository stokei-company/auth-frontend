import Head from "next/head";
import ThemeContainer from "../contexts/theme/ThemeContainer";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeContainer>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </ThemeContainer>
  );
}

export default MyApp;
