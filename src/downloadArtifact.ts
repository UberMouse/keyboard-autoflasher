import got from "got-cjs";
import { writeFile } from "fs/promises";
import { octo, OWNER, REPO } from "./octokit";

export async function downloadAndExtractLatestFirmwareRelease() {
  console.log("Finding artifact URL from latest release");
  const artifactUrl = await retrieveLatestReleaseArtifactUrl();
  console.log("Got artifact URL");
  
  if (artifactUrl === undefined) {
    throw new Error("Could not find the moonlander firmware file on the latest release");
  }
  
  console.log("Downloading artifact");
  const artifact = await got(artifactUrl, { followRedirect: true })
  
  await writeFile("moonlander_firmware.bin", artifact.rawBody)
  console.log("Artifact downloaded to moonlander_firmware.bin");
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