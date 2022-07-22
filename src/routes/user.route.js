import express from "express";

import {
  get_user,
  login_user,
  logout_user,
  register_user,
} from "../controllers/user.controller.js";
import { auth_required } from "../middlewares/auth_protect.js";

const user_router = express.Router();

// authentication routes

user_router.post("/user/register", register_user);
user_router.post("/user/login", login_user);
user_router.post("/user/logout", logout_user);
user_router.get("/user", auth_required, get_user);

export default user_router;
