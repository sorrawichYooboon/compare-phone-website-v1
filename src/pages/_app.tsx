import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { NextIntlProvider } from "next-intl";
import { ReactElement, ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { NextPage } from "next";
import { pageview } from "@/utils/analytics";
import { ConfigProvider } from "antd";
import { DeviceProvider } from "@/context/useDevice";
import { ResponsiveProvider } from "@/context/useResponsive";
import { AuthenticationProvider } from "@/context/useAuthentication";
import { useRouter } from "next/router";
import { useEffect } from "react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<IP, P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();

  if (typeof window !== "undefined") {
    const appHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty("--app-height", `${window.innerHeight}px`);
    };
    window.addEventListener("resize", appHeight);
    appHeight();
  }

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    const documentHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
    };
    documentHeight();
  }, []);

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "Kanit",
            fontSize: 16,
          },
        }}
      >
        <NextIntlProvider messages={pageProps.messages}>
          <ChakraProvider>
            <ResponsiveProvider>
              <AuthenticationProvider>
                <DeviceProvider>
                  {getLayout(<Component {...pageProps} />)}
                </DeviceProvider>
              </AuthenticationProvider>
            </ResponsiveProvider>
          </ChakraProvider>
        </NextIntlProvider>
      </ConfigProvider>
    </>
  );
}
