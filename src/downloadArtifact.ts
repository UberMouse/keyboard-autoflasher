import { Octokit } from "@octokit/rest";
import unzipper from "unzipper";
import got from "got-cjs";
import { writeFile } from "fs/promises";

const OWNER = "ubermouse";
const REPO = "ergodox-macro-hax";

const octo = new Octokit({
  timeZone: "New Zealand/Auckland",
});

export async function downloadAndExtractLatestFirmwareRelease() {
  const artifactUrl = await retrieveLatestReleaseArtifactUrl();
  
  if (artifactUrl === undefined) {
    throw new Error("Could not find the moonlander firmware file on the latest release");
  }
  
  const artifact = await got(artifactUrl, { followRedirect: true })
  
  await writeFile("moonlander_firmware.bin", artifact.rawBody)
}

async function retrieveLatestReleaseArtifactUrl() {
  const releases = await octo.rest.repos.listReleases({
    owner: OWNER,
    repo: REPO,
    // Only want the latest
    per_page: 1
  });
  const latestRelease = releases.data[0];
  const firmwareAsset = latestRelease.assets.find((a) => a.name === "moonlander_firmware.bin");
  
  return firmwareAsset?.browser_download_url;
}