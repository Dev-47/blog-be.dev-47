import express from "express";

import {
  create_post,
  delete_post,
  get_post,
  list_posts,
  update_post,
} from "../controllers/blog.controllers.js";
import { auth_required } from "../middlewares/auth_protect.js";

const blog_router = express.Router();

// authentication routes

blog_router.get("/posts", list_posts);
blog_router.post("/posts", auth_required, create_post);
blog_router.get("/posts/:slug", get_post);
blog_router.put("/posts/:slug", auth_required, update_post);
blog_router.delete("/posts/:slug", auth_required, delete_post);

export default blog_router;
