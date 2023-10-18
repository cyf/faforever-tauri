import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GH_TOKEN,
});
export async function GET() {
  try {
    const latestRelease = await octokit.repos.getLatestRelease({
      owner: "cyf",
      repo: "faforever-next",
    });

    return Response.json(
      { code: 0, data: latestRelease.data },
      { status: 200 },
    );
  } catch (error: any) {
    return Response.json(
      { code: -1, error: error.message || error.toString() },
      { status: 500 },
    );
  }
}