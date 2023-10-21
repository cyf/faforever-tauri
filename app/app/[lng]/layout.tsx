import "./globals.css";
import React from "react";
import cx from "classnames";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { BiArrowToTop } from "react-icons/bi";
import NextTopLoader from "nextjs-toploader";
import { NextIntlClientProvider } from "next-intl";
import GoogleAnalytics from "@/components/shared/google-analytics";
// import CookieBanner from "@/components/shared/cookie-banner";
import ScrollToTop from "@/components/layout/scroll-to-top";
import { sfPro, inter } from "./fonts";
import Particles from "@/app/[lng]/particles";
import Footer from "@/components/layout/footer";
import { Providers } from "@/app/[lng]/providers";
import { languages } from "@/constants";

const Header = dynamic(() => import("@/components/layout/header"), {
  ssr: false,
});

export async function generateMetadata({
  params,
}: {
  params: { lng: string };
}): Promise<Metadata | undefined> {
  return {
    title: params.lng === "en" ? "FaForever" : "FaForever",
    description: `${
      params.lng === "en" ? "FaForever" : "FaForever"
    } - 童话镇里一枝花, 人美歌甜陈一发.`,
    metadataBase: new URL("https://chenyifaer.com"),
    themeColor: "#FFF",
    icons: {
      icon: "/logo.jpg",
    },
  };
}

async function getMessages(lng: string) {
  try {
    return (await import(`../../messages/${lng}.json`)).default;
  } catch (error) {
    notFound();
  }
}

export async function generateStaticParams() {
  return languages.map((lng: string) => ({ lng }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    lng: string;
  };
}) {
  const messages = await getMessages(params.lng);

  return (
    <html lang={params.lng} suppressHydrationWarning>
      <body
        className={cx(
          sfPro.variable,
          inter.variable,
          "flex min-h-screen flex-col",
        )}
      >
        <NextIntlClientProvider locale={params.lng} messages={messages}>
          <NextTopLoader height={1} />
          <Providers>
            <Particles />
            <Header lng={params.lng} />
            <main
              id="main"
              className="flex w-full flex-1 flex-col items-center justify-center py-32"
            >
              {children}
              <GoogleAnalytics />
            </main>
            <Footer lng={params.lng} />
            {/*<CookieBanner lng={params.lng} />*/}
          </Providers>
          <ScrollToTop
            smooth
            component={
              <BiArrowToTop className="mx-auto my-0 h-5 w-5 text-gray-700" />
            }
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
