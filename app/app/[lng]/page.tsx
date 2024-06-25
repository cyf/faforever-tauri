"use client";
import React, { useCallback } from "react";
import Link from "next/link";
import { invoke } from "@tauri-apps/api/tauri";
import Balancer from "react-wrap-balancer";
import { RoughNotation } from "react-rough-notation";
import { IoGameControllerOutline } from "react-icons/io5";
import { BsWindowDesktop } from "react-icons/bs";
import { BiTestTube } from "react-icons/bi";
import { FaBlog } from "react-icons/fa";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useIsTauri } from "@/lib/hooks";
import { allPosts } from "contentlayer/generated";

export default function Home({
  params,
}: {
  params: {
    lng: string;
  };
}) {
  const t = useTranslations();
  const isTauri = useIsTauri();

  const post = allPosts
    .filter((post) => post.slug.startsWith(`${params.lng}/blog`))
    .sort((a, b) => {
      return new Date(a.publishedAt) > new Date(b.publishedAt) ? -1 : 1;
    })
    .at(0);

  const createWindow = async () => {
    await invoke("open_docs");
  };

  const ShowContent = useCallback(
    ({
      isShow,
      children,
    }: {
      isShow: boolean;
      children: React.ReactElement;
    }) => {
      return isShow ? children : null;
    },
    [],
  );

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
            src="/logo.png"
            width={160}
            height={160}
          />
        </div>
        <h1
          className="font-display animate-fade-up bg-clip-text text-center text-4xl font-bold tracking-[-0.02em] text-black/80 opacity-0 drop-shadow-sm dark:text-white/80 md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <Balancer>{t("header.title")}</Balancer>
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
              {t("home.title")}
            </RoughNotation>
          </Balancer>
        </p>
      </div>
      <div className="mt-10 grid w-full max-w-screen-xl animate-fade-up xl:px-0">
        <div className="flex items-center justify-center">
          <div
            className={`grid w-full grid-cols-1 gap-5 md:max-w-3xl ${isTauri ? "md:grid-cols-3" : "md:grid-cols-2"}`}
          >
            <Link
              href={`https://www.chenyifaer.com/portal/${params.lng}/admin/`}
              target="_blank"
              className="flex items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800 hover:enabled:border-gray-800 disabled:cursor-not-allowed dark:bg-black dark:text-white/80 max-md:mx-10"
              rel="noopener noreferrer"
            >
              <BiTestTube className="h-7 w-7" />
              <p>
                <span className="sm:inline-block">{t("common.join")}</span>
              </p>
            </Link>
            <Link
              href="https://www.chenyifaer.com/fafa-runner/play"
              target="_blank"
              className="flex items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800 hover:enabled:border-gray-800 disabled:cursor-not-allowed dark:bg-black dark:text-white/80 max-md:mx-10"
              rel="noopener noreferrer"
            >
              <IoGameControllerOutline className="h-7 w-7" />
              <p>
                <span className="sm:inline-block">{t("common.play")}</span>
              </p>
            </Link>
            <ShowContent isShow={isTauri}>
              <button
                className="flex items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800 hover:enabled:border-gray-800 disabled:cursor-not-allowed dark:bg-black dark:text-white/80 max-md:mx-10"
                onClick={createWindow}
              >
                <BsWindowDesktop className="h-7 w-7" />
                <p>
                  <span className="sm:inline-block">{t("common.create")}</span>
                </p>
              </button>
            </ShowContent>
          </div>
        </div>
      </div>
    </>
  );
}
