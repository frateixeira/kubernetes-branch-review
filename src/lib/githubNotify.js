import { authenticate } from "./githubAuth";
export const createDeployment = async (
  event,
  status = { task: "deploy", description: "Initializing deployment" }
) => {
  const client = await authenticate(event.installation.id);
  const repoOwner = event.repository.owner.login;
  const repoName = event.repository.name;
  const sha = event.pull_request.head.sha;

  const statusObj = Object.assign(
    {
      owner: repoOwner,
      repo: repoName,
      ref: sha,
      environment: "staging",
      payload: "from the app"
    },
    status
  );

  let result = "";

  try {
    result = await client.repos.createDeployment(statusObj);
  } catch (e) {
    console.log(e.message);
  }

  return result;
};
