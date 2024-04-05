import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import GitHubPkg from "@/components/home/github-pkg";
import { Apple, Linux, Microsoft } from "@/components/shared/icons";
import { platforms } from "@/constants";
import { latestRelease } from "@/request";
import { useTranslation } from "@/i18n/client";
import type { LngProps } from "@/types/i18next-lng";
import type { Asset, Release } from "@/types/github";
import type { SystemOS } from "@/types/common";

export default function GitHubRelease({ lng }: LngProps) {
  const { t } = useTranslation(lng, "common");
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Release>({});
  const [error, setError] = useState<any>(null);

  const assets = useMemo(() => {
    if (data) {
      return (
        data.assets?.filter(
          ({ name }) => !(name?.includes("x86_64") || name?.endsWith(".sig")),
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
          setError(res?.msg);
        }
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message || error.toString());
        console.error(error);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className="mt-10 grid w-full max-w-screen-xl animate-fade-up xl:px-0">
        <div className="flex items-center justify-center">
          <div className="grid w-full grid-cols-1 gap-5 px-10 sm:grid-cols-2 sm:px-10 md:grid-cols-3">
            <GitHubPkg
              lng={lng}
              disabled={loading || error || !macos.length}
              assets={macos}
              wrapperClassName="border border-gray-300 hover:border-gray-800 shadow-md"
            >
              <Apple className="h-7 w-7" />
              <p>
                <span className="sm:inline-block">macOS</span>
              </p>
            </GitHubPkg>
            <GitHubPkg
              lng={lng}
              disabled={loading || error || !windows.length}
              assets={windows}
              wrapperClassName="border border-gray-300 hover:border-gray-800 shadow-md"
            >
              <Microsoft className="h-7 w-7" />
              <p>
                <span className="sm:inline-block">Windows</span>
              </p>
            </GitHubPkg>
            <GitHubPkg
              lng={lng}
              disabled={loading || error || !linux.length}
              assets={linux}
              wrapperClassName="border border-gray-300 hover:border-gray-800 shadow-md"
            >
              <Linux className="h-7 w-7" />
              <p>
                <span className="sm:inline-block">Linux</span>
              </p>
            </GitHubPkg>
          </div>
        </div>
      </div>
      <p
        className="mt-4 animate-fade-up text-center text-sm opacity-0"
        style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
      >
        <Balancer>
          {data?.tag_name && (
            <>
              {t("latest")}:{" "}
              <Link
                className="text-[#ff7979]"
                href={`https://github.com/cyf/faforever/releases/tag/${data?.tag_name}`}
                target="_blank"
              >
                {data?.tag_name}
              </Link>
            </>
          )}
          <Link
            href={`/${lng}/releases`}
            className="ml-2 text-sm text-gray-500 hover:underline dark:text-gray-400"
          >
            {t("more-versions")}
          </Link>
        </Balancer>
      </p>
    </>
  );
}
