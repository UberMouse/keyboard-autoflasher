import * as __ts2742Paginate from "@octokit/plugin-paginate-rest"
import * as __ts2742Core from "@octokit/core";
import * as __ts2742Rest from "@octokit/plugin-rest-endpoint-methods";
import { Octokit } from "@octokit/rest";

export const OWNER = "ubermouse";
export const REPO = "ergodox-macro-hax";

export const octo = new Octokit({
  timeZone: "New Zealand/Auckland",
  auth: process.env.PAT
});