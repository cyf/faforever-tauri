"use client";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { RoughNotation } from "react-rough-notation";
import { FiMail } from "react-icons/fi";
import { IoGameControllerOutline } from "react-icons/io5";
import {
  SiTaobao,
  SiSpotify,
  SiSinaweibo,
  SiInstagram,
  SiYoutube,
  SiTwitch,
  SiTwitter,
  SiTelegram,
} from "react-icons/si";
import { BiTestTube } from "react-icons/bi";
import { FaBlog } from "react-icons/fa";
import Image from "next/image";
// import dynamic from "next/dynamic";
import Pkg from "@/components/home/pkg";
import { Microsoft, Apple, Linux } from "@/components/shared/icons";
import { useTranslation } from "@/i18n/client";
import { latestRelease } from "@/request";
import { allPosts } from "contentlayer/generated";
import { Asset, Release } from "@/types/release";

// const DynamicCard = dynamic(() => import("@/components/home/card"), {
//   ssr: false,
// });

type SystemOS = "macos" | "windows" | "linux";

const platforms: Record<SystemOS, string[]> = {
  macos: [
    "aarch64.dmg",
    "universal.dmg",
    "x64.dmg",
    "aarch64.app.tar.gz",
    "universal.app.tar.gz",
    "x64.app.tar.gz",
  ],
  windows: [
    "arm64-setup.exe",
    "x64-setup.exe",
    "x64-setup.nsis.zip",
    "x86-setup.exe",
    "x86-setup.nsis.zip",
  ],
  linux: ["amd64.AppImage", "amd64.AppImage.tar.gz", "amd64.deb"],
};

export default function Home({
  params,
}: {
  params: {
    lng: string;
  };
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Release>({});
  const [error, setError] = useState<any>(null);
  const { t } = useTranslation(params.lng, "header");
  const post = allPosts
    .filter((post) => post.slug.startsWith(`${params.lng}/blog`))
    .sort((a, b) => {
      return new Date(a.publishedAt) > new Date(b.publishedAt) ? -1 : 1;
    })
    .at(0);

  const assets = useMemo(() => {
    if (data) {
      return (
        data.assets?.filter(
          ({ name }) => !(name?.includes("-debug") || name?.endsWith(".sig")),
        ) || []
      );
    }
    return [];
  }, [data]);

  const { macos, windows, linux } = useMemo(() => {
    const packages: Record<SystemOS, Asset[]> = {
      macos: [],
      windows: [],
      linux: [],
    };
    Object.keys(platforms).forEach((key: string) => {
      const matcher = (name: string) =>
        platforms[key as SystemOS].some((platform: string) =>
          name.endsWith(platform),
        );
      packages[key as SystemOS] =
        assets.filter(({ name }) => name && matcher(name)) || [];
    });
    return packages;
  }, [assets]);

  const loadData = () => {
    setLoading(true);
    latestRelease()
      .then((res) => {
        setLoading(false);
        if (res?.code === 0) {
          setData(res?.data || {});
        } else {
          setError(res?.error);
        }
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message || error.toString());
      });
  };

  useEffect(() => {
    console.log("initial");
    loadData();
  }, []);

  return (
    <>
      <div className="w-full max-w-xl px-5 xl:px-0">
        {post && (
          <Link
            href={`/${post.slug}`}
            rel="noreferrer"
            className="mx-auto mb-12 flex max-w-fit animate-fade-up items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-7 py-2 transition-colors hover:bg-blue-200"
          >
            <FaBlog className="h-5 w-5 text-[#1d9bf0]" />
            <p className="text-sm font-semibold text-[#1d9bf0]">{post.title}</p>
          </Link>
        )}
        <div className="mb-8 flex items-center justify-center space-x-20">
          <Image
            className="rounded-full"
            alt="logo"
            src="/faforever/logo.jpg"
            width={160}
            height={160}
          />
        </div>
        <h1
          className="animate-fade-up bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-black/80 opacity-0 drop-shadow-sm dark:text-white/80 md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <Balancer>{t("title")}</Balancer>
        </h1>
        <p
          className="mt-6 animate-fade-up text-center text-red-400 opacity-0 md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          <Balancer>
            <RoughNotation
              animate
              type="highlight"
              show={true}
              color="rgb(36, 54, 110)"
              animationDelay={1000}
              animationDuration={2500}
            >
              一个可以听发姐音乐的桌面客户端
            </RoughNotation>
            .
          </Balancer>
        </p>
      </div>
      <div
        className="mx-auto mt-10 grid w-full animate-fade-up grid-cols-1 gap-5 opacity-0 md:max-w-2xl md:grid-cols-3"
        style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
      >
        <Pkg
          lng={params.lng}
          disabled={loading || error || !macos.length}
          assets={macos}
        >
          <Apple className="h-7 w-7" />
          <p>
            <span className="sm:inline-block">Apple</span>
          </p>
        </Pkg>
        <Pkg
          lng={params.lng}
          disabled={loading || error || !windows.length}
          assets={windows}
        >
          <Microsoft className="h-7 w-7" />
          <p>
            <span className="sm:inline-block">Microsoft</span>
          </p>
        </Pkg>
        <Pkg
          lng={params.lng}
          disabled={loading || error || !linux.length}
          assets={linux}
        >
          <Linux className="h-7 w-7" />
          <p>
            <span className="sm:inline-block">Linux</span>
          </p>
        </Pkg>
      </div>
      <p
        className="mt-4 animate-fade-up text-center text-sm text-red-400 opacity-0"
        style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
      >
        <Balancer>{data?.tag_name}</Balancer>
      </p>
      {/*<div className="my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-5 px-5 sm:grid-cols-2 lg:grid-cols-3 xl:px-0">*/}
      {/*  {features.map(({ title, description, demo, url }) => (*/}
      {/*    <DynamicCard*/}
      {/*      key={title}*/}
      {/*      title={title}*/}
      {/*      description={description}*/}
      {/*      demo={demo}*/}
      {/*      url={url}*/}
      {/*    />*/}
      {/*  ))}*/}
      {/*</div>*/}
    </>
  );
}

const features = [
  {
    title: "Taobao",
    description:
      "Pre-built beautiful, a11y-first components, powered by [Tailwind CSS](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), and [Framer Motion](https://framer.com/motion)",
    demo: (
      <SiTaobao className="h-24 w-24 text-gray-600 transition-all dark:text-white/80" />
    ),
    url: "https://chenyifaer.taobao.com",
  },
  {
    title: "Instagram",
    description:
      "Built on [Next.js](https://nextjs.org/) primitives like `@next/font` and `next/image` for stellar performance.",
    demo: (
      <SiInstagram className="h-24 w-24 text-gray-600 transition-all dark:text-white/80" />
    ),
    url: "https://instagram.com/yifaer_chen",
  },
  {
    title: "YouTube",
    description:
      "Jumpstart your next project by deploying Precedent to [Vercel](https://vercel.com/) in one click.",
    demo: (
      <SiYoutube className="h-24 w-24 text-gray-600 transition-all dark:text-white/80" />
    ),
    url: "https://www.youtube.com/@chenyifaer",
  },
  {
    title: "Twitch",
    description:
      "Jumpstart your next project by deploying Precedent to [Vercel](https://vercel.com/) in one click.",
    demo: (
      <SiTwitch className="h-24 w-24 text-gray-600 transition-all dark:text-white/80" />
    ),
    url: "https://www.twitch.tv/thebs_chen",
  },
  {
    title: "Spotify",
    description:
      "Jumpstart your next project by deploying Precedent to [Vercel](https://vercel.com/) in one click.",
    demo: (
      <SiSpotify className="h-24 w-24 text-gray-600 transition-all dark:text-white/80" />
    ),
    url: "https://open.spotify.com/artist/10xtjTRMlKZ7aFx6VBQlSj",
  },
  {
    title: "Weibo",
    description:
      "Jumpstart your next project by deploying Precedent to [Vercel](https://vercel.com/) in one click.",
    demo: (
      <SiSinaweibo className="h-24 w-24 text-gray-600 transition-all dark:text-white/80" />
    ),
    url: "https://weibo.com/u/7357828611",
  },
  {
    title: "Twitter",
    description:
      "Jumpstart your next project by deploying Precedent to [Vercel](https://vercel.com/) in one click.",
    demo: (
      <SiTwitter className="h-24 w-24 text-gray-600 transition-all dark:text-white/80" />
    ),
    url: "https://twitter.com/yifaer_chen",
  },
  {
    title: "Telegram",
    description:
      "Jumpstart your next project by deploying Precedent to [Vercel](https://vercel.com/) in one click.",
    demo: (
      <SiTelegram className="h-24 w-24 text-gray-600 transition-all dark:text-white/80" />
    ),
    url: "https://t.me/FaFa67373",
  },
  {
    title: "Email",
    description:
      "Precedent comes with authentication and database via [Auth.js](https://authjs.dev/) + [Prisma](https://prisma.io/)",
    demo: (
      <FiMail className="h-24 w-24 text-gray-600 transition-all dark:text-white/80" />
    ),
    url: "mailto:chenyifaer777@gmail.com",
  },
  {
    title: "FaFa Runner",
    description:
      "Precedent offers a collection of hooks, utilities, and `@vercel/og`",
    demo: (
      <IoGameControllerOutline className="h-24 w-24 text-gray-600 transition-all dark:text-white/80" />
    ),
    url: "https://chenyifaer.com/fafa-runner",
  },
  {
    title: "CYF Insider",
    description:
      "Precedent offers a collection of hooks, utilities, and `@vercel/og`",
    demo: (
      <BiTestTube className="h-24 w-24 text-gray-600 transition-all dark:text-white/80" />
    ),
    url: "https://chenyifaer.com/join",
  },
];