import { Endpoint } from "../models/EndPoint";
import initializeConsume from "../services/requests";

const LookupIdeaEndpoints: { [key: string]: Endpoint } = {
  getAllLkInputTypes: { url: "/GetAllLkInputTypes", method: "get" },
};

const LookupIdeaBaseUrl = `${
  (window as any)._env_?.REACT_APP_API_IdeaBank_Url
}/api/v1/Lookup/`;

export const LookupIdeaConsume = initializeConsume(
  LookupIdeaBaseUrl,
  LookupIdeaEndpoints
);
