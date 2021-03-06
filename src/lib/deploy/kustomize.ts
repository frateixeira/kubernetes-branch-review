import { getFile } from "../util/getFile";
import yaml from "js-yaml";
import { Config } from "../../interfaces/Config";
import { writeFile } from "../util/writeFile";

const DIR = process.env.CODE_DIR || "/tmp";

const loadKustomization = async (sha: string, overlayPath: string) => {
  const configData = await getFile(
    `${DIR}/${sha}/${overlayPath}/kustomization.yaml`
  );
  if (!configData) return false;
  try {
    return yaml.safeLoad(configData.toString("utf8"));
  } catch (e) {
    console.error(e.message);
    return false;
  }
};

const writeKustomization = async (
  sha: string,
  overlayPath: string,
  config: Config
): Promise<boolean> => {
  const filePath = `${DIR}/${sha}/${overlayPath}/kustomization.yaml`;
  return writeFile(filePath, config);
};

export const editKustomization = async (
  sha: string,
  overlayPath: string,
  images: {}[]
): Promise<string | boolean> => {
  let config = await loadKustomization(sha, overlayPath);
  if (!config) return false;
  config.images = images;
  return writeKustomization(sha, overlayPath, config);
};
