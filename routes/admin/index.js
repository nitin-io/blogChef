import { Router } from "express";
import dashboard from "./dashboard.js";
import login from "./login.js";
import loginHandler from "./loginHandler.js";
import logoutHandler from "./logoutHandler.js";
import protectedRoute from "../../utils/protectedRoute.js";
import signupHandler from "./signupHandler.js";

const router = Router();

router.route("/login").get(login).post(loginHandler);

router
  .route("/signup")
  .get((req, res) => res.render("signup"))
  .post(signupHandler);

router.get("/logout", logoutHandler);

router.get("/dashboard", protectedRoute, dashboard);

export default router;
