import { Endpoint } from "../models/EndPoint";
import initializeConsume from "../services/requests";

const IdeaBankEndpoints: { [key: string]: Endpoint } = {
  getIdeasByRequestStage: { url: "/GetAllIdeasByRequestStage", method: "get" },
  getIdeaDetailsByRequestStage: {
    url: "/GetIdeaDetailsByRequestStage",
    method: "getById",
  },
  editIdeaRequestStage: { url: "/ChangeRequestStage", method: "putById" },
  getIdeas: { url: "/GetAllIdeasPaginated", method: "get" },
  getIdea: { url: "/GetIdeaDetailsById", method: "getById" },
  addIdea: { url: "/PostIdea", method: "post" },
  editIdea: { url: "/PutIdea", method: "putById" },
  deleteIdea: { url: "/DeleteIdea", method: "delete" },
  addComment: { url: "/PostIdeaComment", method: "post" },
  ideaAddReaction: { url: "/PostIdeaLikeDislike", method: "post" },
  ideaAddRating: { url: "/PostIdeaRating", method: "post" },
  ideaDeleteComment: { url: "/DeleteIdeaComment", method: "delete" },
  ideaEditComment: { url: "/PutIdeaComment", method: "putById" },
  ideaCommentAddReaction: { url: "/PostCommentLikeDislike", method: "post" },
};

const IdeaBankBaseUrl = `${
  (window as any)._env_?.REACT_APP_API_IdeaBank_Url
}/api/v1/Idea/`;

export const IdeaBankConsume = initializeConsume(
  IdeaBankBaseUrl,
  IdeaBankEndpoints
);
