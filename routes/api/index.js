import { Router } from "express";
import loginUser from "./login-user.js";
import getPost from "./get-post.js";
import signupUser from "./signup-user.js";

const router = Router();

router.get("/posts", getPost);
router.post("/login", loginUser);
router.post("/signup", signupUser);

export default router;
