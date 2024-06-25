"use client";
import React, { useCallback } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { emit } from "@tauri-apps/api/event";
import { BsWindowDesktop } from "react-icons/bs";
import { useTranslations } from "next-intl";
import { useIsTauri } from "@/lib/hooks";

export default function Settings({
  params,
}: {
  params: {
    lng: string;
  };
}) {
  const t = useTranslations();
  const isTauri = useIsTauri();

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
    <div className="mt-10 grid w-full max-w-screen-xl animate-fade-up xl:px-0">
      <div className="flex items-center justify-center">
        <button
          className="flex items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800 hover:enabled:border-gray-800 disabled:cursor-not-allowed dark:bg-black dark:text-white/80 max-md:mx-10"
          onClick={
            !isTauri
              ? () => {}
              : () => {
                  console.log("change_language");
                  emit("change_language", "zh");
                }
          }
        >
          <BsWindowDesktop className="h-7 w-7" />
          <p>
            <span className="sm:inline-block">
              {t("settings.change-language")}
            </span>
          </p>
        </button>
      </div>
    </div>
  );
}
