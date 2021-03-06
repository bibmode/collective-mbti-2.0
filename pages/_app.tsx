import "../styles/globals.css";
import type { AppProps } from "next/app";
import LayoutContextProvider from "../components/context/LayoutContext";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider
      // Provider options are not required but can be useful in situations where
      // you have a short session maxAge time. Shown here with default values.
      session={pageProps.session}
    >
      <LayoutContextProvider>
        <Component {...pageProps} />
      </LayoutContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
