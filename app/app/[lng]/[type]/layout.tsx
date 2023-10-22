import React from "react";
import { allPosts } from "contentlayer/generated";

export async function generateStaticParams({
  params: { lng },
}: {
  params: { lng: string };
}) {
  console.log("allPosts", allPosts[0]);
  return allPosts
    .filter((post) => post.slug.startsWith(`${lng}/`))
    .map((post) => {
      return {
        type: post.slug.split("/")[1],
      };
    });
}

export default async function DocLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
