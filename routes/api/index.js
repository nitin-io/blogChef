import { Router } from "express";
import loginUser from "./login-user.js";
import getPosts from "./get-posts.js";
import signupUser from "./signup-user.js";
import getPost from "./get-post.js";
import storePost from "./store-post.js";
import deletePost from "./delete-post.js";
import protectApi from "../../utils/protectApi.js";
import verify from "../../utils/verify.js";
import {
  servePostFromCache,
  servePostsFromCache,
} from "../../controllers/cache.js";
import {
  jwtValidation,
  loginUserValidation,
  signupValidation,
  storePostValidation,
} from "../../utils/validator.js";

const router = Router();

router.get("/posts", servePostsFromCache, getPosts);
router.post("/login", loginUserValidation, loginUser);
router.post("/signup", signupValidation, signupUser);
router
  .route("/post/:postId?")
  .get(servePostFromCache, getPost)
  .post(protectApi, storePostValidation, storePost)
  .delete(protectApi, deletePost);
router.post("/verify", jwtValidation, verify);

export default router;
