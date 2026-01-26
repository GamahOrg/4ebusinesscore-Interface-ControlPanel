import { Endpoint } from "../models/EndPoint";
import initializeConsume from "../services/requests";

const KnowledgeAggEndpoints: { [key: string]: Endpoint } = {
  getIdeasByRequestStage: {
    url: "/IdeaBank/GetAllRequestedIdeas",
    method: "get",
  },
  getIdeaDetailsByRequestStage: {
    url: "/IdeaBank/GetRequestedIdeaById",
    method: "getById",
  },
  ideaGetComments: {
    url: "/IdeaBankComment/GetAllCommentsByIdeaBankId",
    method: "getById",
  },
  getBlog: { url: "/Blog", method: "getById" },
  getBlogs: { url: "/Blog", method: "get" },
  getBlogComments: {
    url: "/blogComment/getAllCommentsByBlogId",
    method: "getById",
  },
  getAllRequestedBlogs: { url: "/Blog/GetAllRequestedBlogs", method: "get" },
  getRequestedBlogById: {
    url: "/Blog/GetRequestedBlogById",
    method: "getById",
  },
  getSubKnowledgeByKnowledgeId: {
    url: "/SubKnowledge/GetAllSubKnowledges",
    method: "get",
  },
  getSubKnowledgeById: {
    url: "/SubKnowledge",
    method: "getById",
  },
  getChallenge: { url: "/Challenge", method: "getById" },
  getChallenges: { url: "/Challenge", method: "get" },
  getChallengeComments: {
    url: "/Comment/GetAllCommentsByChallengeId",
    method: "getById",
  },
  getAllRequestedChallenges: {
    url: "/Challenge/GetAllRequestedChallenges",
    method: "get",
  },
  getRequestedChallengesById: {
    url: "/Challenge/GetRequestedChallengeById",
    method: "getById",
  },
  getAllRequestedQuestions: {
    url: "/Question/GetAllRequestedQuestions",
    method: "get",
  },
  getRequestedQuestionsById: {
    url: "/Question/GetRequestedQuestionById",
    method: "getById",
  },
  getAllExpertsQuestions: {
    url: "/Question",
    method: "get",
  },
  getAllIncomingQuestions: {
    url: "/Question/MyIncomingQuestions",
    method: "get",
  },
  getAllOutgoingQuestions: {
    url: "/Question/MyOutGoingQuestions",
    method: "get",
  },
  getExpertsQuestion: {
    url: "/Question",
    method: "getById",
  },
  questionGetComments: {
    url: "/QuestionComment/GetAllCommentsByQuestionId",
    method: "getById",
  },
  getPrivateKnowledge: {
    url: "/Knowledge/GetAllPrivateKnowledges",
    method: "get",
  },
  getAllIdeasPaginated: {
    url: "/IdeaBank/GetAllIdeasPaginated",
    method: "get",
  },
  getIdeaDetailsById: {
    url: "/IdeaBank/GetIdeaDetailsById",
    method: "getById",
  },
  getQuestionsByExpertId: {
    url: "Question/GetQuestionsByExpertId",
    method: "get",
  },
  getRequestedQuestionById: {
    url: "/Question/GetRequestedQuestionById",
    method: "getById",
  },
  getRequestedIdeaById: {
    url: "/IdeaBank/GetRequestedIdeaById",
    method: "getById",
  },
  getRequestedBlogByIdForDetails: {
    url: "/Blog/GetRequestedBlogById",
    method: "getById",
  },

  getRequestedChallengeById: {
    url: "/Challenge/GetRequestedChallengeById",
    method: "getById",
  },
};

const KnowledgeAggBaseUrl = `${
  (window as any)._env_?.REACT_APP_API_Knowledge_Agg_Url
}/api/`;

export const KnowledgeAggConsume = initializeConsume(
  KnowledgeAggBaseUrl,
  KnowledgeAggEndpoints
);
