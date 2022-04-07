import { downloadAndExtractLatestFirmwareRelease } from "./downloadArtifact";
import { triggerWorkflowAndWaitForCompletion } from "./triggerWorkflow";

async function main() {
  if (process.argv[2] === "trigger") {
    await triggerWorkflowAndWaitForCompletion();
  }

  await downloadAndExtractLatestFirmwareRelease();
}

main().catch(console.error);