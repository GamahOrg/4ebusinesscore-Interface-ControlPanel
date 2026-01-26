import { Endpoint } from "../models/EndPoint";
import initializeConsume from "../services/requests";

const KnowledgeEndpoints: { [key: string]: Endpoint } = {
  addKnowledge: { url: "/Knowledge/PostKnowledge", method: "post" },
  editKnowledge: { url: "/Knowledge/PutKnowledge", method: "putById" },
  removeKnowledge: { url: "/Knowledge/DeleteKnowledge", method: "delete" },
  getKnowledgeCategory: {
    url: "/Knowledge/GetAllKnowledgeCategories",
    method: "get",
  },
  getSubKnowledgeCategory: {
    url: "/SubKnowledge/GetAllSubKnowledgeCategories",
    method: "get",
  },
  getPublicKnowledge: {
    url: "/Knowledge/GetAllPublicKnowledgePaginated",
    method: "get",
  },
  getPrivateKnowledge: {
    url: "/Knowledge/GetAllPrivateKnowledgePaginated",
    method: "get",
  },
  getKnowledgeById: {
    url: "/Knowledge",
    method: "getById",
  },
  addSubKnowledge: { url: "/SubKnowledge", method: "post" },
  editSubKnowledge: { url: "/SubKnowledge", method: "putById" },
  removeSubKnowledge: { url: "/SubKnowledge", method: "delete" },
  subKnowledgeReaction: {
    url: "/Knowledge/PostSubKnowledgeLikeDisLike",
    method: "post",
  },
  subKnowledgeRating: {
    url: "/Knowledge/PostSubKnowledgeRate",
    method: "post",
  },
  subKnowledgeFavorite: { url: "/Favourite", method: "post" },
};

const KnowledgeBaseUrl = `${
  (window as any)._env_?.REACT_APP_API_Knowledge_Url
}/api/v1/`;

export const KnowledgeConsume = initializeConsume(
  KnowledgeBaseUrl,
  KnowledgeEndpoints
);
