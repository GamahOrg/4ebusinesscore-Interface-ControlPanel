import { Endpoint } from "../models/EndPoint";
import initializeConsume from "../services/requests";

const ChallengeEndpoints: { [key: string]: Endpoint } = {
  addChallenge: { url: "/Challenge", method: "post" },
  editChallenge: { url: "/Challenge", method: "putById" },
  deleteChallenge: { url: "/Challenge", method: "delete" },
  getLookupsProjects: {
    url: "/LK_ChallengeCategory/GetAllLkChallengeCategory",
    method: "get",
  },
  addComment: { url: "/Comment", method: "post" },
  editComment: { url: "/Comment", method: "putById" },
  deleteComment: { url: "/Comment", method: "delete" },
  updateRequestStage: {
    url: "/Challenge/UpdateRequestStage",
    method: "putById",
  },
};
const ChallengeBaseUrl = `${
  (window as any)._env_?.REACT_APP_API_Challenge_Url
}/api/v1/`;

export const ChallengeConsume = initializeConsume(
  ChallengeBaseUrl,
  ChallengeEndpoints
);
