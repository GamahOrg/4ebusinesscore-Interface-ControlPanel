import { Endpoint } from "../models/EndPoint";
import initializeConsume from "../services/requests";

const BlogEndpoints: { [key: string]: Endpoint } = {
  addBlog: { url: "/blog", method: "post" },
  editBlog: { url: "/blog", method: "putById" },
  deleteBlog: { url: "/blog", method: "delete" },
  addComment: { url: "/comment", method: "post" },
  editComment: { url: "/comment", method: "put" },
  deleteComment: { url: "/comment", method: "delete" },
  likeBlog: { url: "/likes/postBlogLike", method: "post" },
  likeBlogComment: { url: "/likes/postCommentLike", method: "post" },
  editRequestedBlog: { url: "/Blog/PutRequestedBlog", method: "putById" },
};
const BlogBaseUrl = `${(window as any)._env_?.REACT_APP_API_Blog_Url}/api/v1/`;

export const BlogConsume = initializeConsume(BlogBaseUrl, BlogEndpoints);
