"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { LngProps } from "@/i18";

export default function Footer(props: LngProps) {
  const t = useTranslations();
  const fullYear = new Date().getFullYear();

  return (
    <div className="w-full border-b border-gray-200 py-5 text-center dark:border-gray-700">
      {/*<p className="text-gray-500 dark:text-white/80">*/}
      {/*  {t("footer.footer")}{" "}*/}
      {/*  <a*/}
      {/*    className="font-medium text-gray-800 underline transition-colors dark:text-white/90"*/}
      {/*    href="https://github.com/cyf/fafa-runner"*/}
      {/*    target="_blank"*/}
      {/*    rel="noopener noreferrer"*/}
      {/*  >*/}
      {/*    GitHub*/}
      {/*  </a>*/}
      {/*</p>*/}
      <p className="mt-2 flex items-center justify-center">
        <Link
          className="font-medium text-gray-800 underline transition-colors dark:text-white/90"
          href={`/${props.lng}/legal/privacy`}
          rel="noopener noreferrer"
        >
          {t("footer.privacy")}
        </Link>
        &nbsp;&nbsp;
        <Link
          className="font-medium text-gray-800 underline transition-colors dark:text-white/90"
          href={`/${props.lng}/legal/terms-of-use`}
          rel="noopener noreferrer"
        >
          {t("footer.terms-of-use")}
        </Link>
      </p>
      <span className="mt-2 flex flex-wrap items-center justify-center text-sm text-gray-500 dark:text-gray-400 sm:text-center">
        © {`2023${fullYear === 2023 ? "" : `-${fullYear}`}`}&nbsp;
        <a href="https://www.chenyifaer.com" className="hover:underline">
          {t("header.title")}
        </a>
        . {t("footer.copyright")}&nbsp;
        {process.env.GIT_COMMIT_SHA && (
          <p className="flex items-center justify-center">
            <a
              href={`https://github.com/cyf/faforever-next/commit/${process.env.GIT_COMMIT_SHA}`}
              target="_blank"
              className="hover:underline"
              rel="noreferrer"
            >
              {process.env.GIT_COMMIT_SHA.substring(0, 8)}
            </a>
          </p>
        )}
        &nbsp;
        <Image
          src="https://visitor-badge.laobi.icu/badge?page_id=fafa-runner.chenyifaer.com"
          width={60}
          height={20}
          alt="visitor badge"
        />
      </span>
    </div>
  );
}
