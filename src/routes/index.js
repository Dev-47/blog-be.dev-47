import express from "express";

import user_router from "./user.route.js";
import blog_router from "./blog.route.js";

const router = express.Router();

router.use("", user_router);
router.use("", blog_router);

export default router;
