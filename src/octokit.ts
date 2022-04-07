import { Octokit } from "@octokit/rest";

export const OWNER = "ubermouse";
export const REPO = "ergodox-macro-hax";

export const octo: any = new Octokit({
  timeZone: "New Zealand/Auckland",
  auth: process.env.PAT
});