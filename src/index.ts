import { downloadAndExtractLatestFirmwareRelease } from "./downloadArtifact";

async function main() {
  await downloadAndExtractLatestFirmwareRelease();
}

main().catch(console.error);