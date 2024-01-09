import { Router } from "express";
import loginUser from "./login-user.js";
import getPosts from "./get-posts.js";
import signupUser from "./signup-user.js";
import getPost from "./get-post.js";
import storePost from "./store-post.js";
import deletePost from "./delete-post.js";
import protectedRoute from "./protectedRoute.js";
import verify from "../../utils/verify.js";

const router = Router();

router.get("/posts", getPosts);
router.post("/login", loginUser);
router.post("/signup", signupUser);
router
  .route("/post/:postId?")
  .get(getPost)
  .post(protectedRoute, storePost)
  .delete(deletePost);
router.post("/verify", verify);

export default router;
