import { OWNER, REPO, octo } from "./octokit";

const WORKFLOW_ID = "process.yml";

export async function triggerWorkflowAndWaitForCompletion() {
  if (await checkIfWorkflowAlreadyRunning() === false) {
    await triggerWorkflow();
  }

  await waitForCompletion();
}

async function checkIfWorkflowAlreadyRunning() {
  console.log("Checking if we already have a workflow running");
  
  const run = await getLatestWorkflowRun();
  
  const running = run.status === "running" || run.status === "queued";
  console.log("Latest workflow status is", run.status);
  console.log(running ? "Already running, not starting new one" : "Not running, starting new run");
  
  return running;
}

async function triggerWorkflow() {
  console.log("Creating workflow run");
  await octo.actions.createWorkflowDispatch({
    owner: OWNER,
    repo: REPO,
    workflow_id: WORKFLOW_ID,
    ref: "master"
  });
  console.log("Workflow started");
}

async function waitForCompletion() {
  console.log("Waiting for completion, sleeping 1m 30s before checking");
  // Sleep until the earliest the workflow might possibly be completed
  // usually takes 2+ minutes
  await new Promise((res) => setTimeout(res, 90 * 1000));

  let finished = false;
  while (!finished) {
    const run = await getLatestWorkflowRun();
    if (run.conclusion === "success") {
      console.log("Workflow run completed");
      finished = true;
    } else {
      console.log("Workflow still processing, sleeping for 15s");
      await new Promise((res) => setTimeout(res, 15 * 1000));
    }
  }
}


async function getLatestWorkflowRun() {
  const workflowRuns = await octo.actions.listWorkflowRunsForRepo({
    owner: OWNER,
    repo: REPO,
    // Only want latest
    per_page: 1
  });
  
  return workflowRuns.data.workflow_runs[0];
}