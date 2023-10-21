import { redirect } from "next/navigation";
// import { headers } from 'next/headers';
import acceptLanguage from "accept-language";
import { languages } from "@/constants";

acceptLanguage.languages(languages);

export default function RootPage() {
  // const headersList = headers();
  // const lng = acceptLanguage.get(headersList.get("Accept-Language")) ?? 'en';
  redirect(`/en`);
}
