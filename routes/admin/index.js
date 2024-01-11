import { Router } from "express";
import dashboard from "./dashboard.js";
import login from "./login.js";
import loginHandler from "./loginHandler.js";
import logoutHandler from "./logoutHandler.js";
import protectedRoute, { csrfProtection } from "../../utils/protectedRoute.js";
import signupHandler from "./signupHandler.js";
import moderatePost from "./moderate-post.js";
import {
  loginAdminValidation,
  signupAdminValidation,
} from "../../utils/validator.js";

const router = Router();

router
  .route("/login")
  .get(csrfProtection, login)
  .post(csrfProtection, loginAdminValidation, loginHandler);

router
  .route("/signup")
  .get((req, res) => res.render("signup"))
  .post(signupAdminValidation, signupHandler);

router.get("/logout", logoutHandler);

router.get("/dashboard", protectedRoute, dashboard);

router.post("/moderate", moderatePost);

export default router;
