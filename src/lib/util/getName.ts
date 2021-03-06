import { getRefId } from "./getRefId";
import { Request } from "../../interfaces";

export const getName = (req: Request): string => {
  const body = req.body;
  const refId = getRefId(body);

  if (!refId) {
    throw new Error("refId not defined");
  }
  const name = refId.replace(/\//g, "-").replace(/_/g, "-");
  return `branch-review-app-${name}`;
};
