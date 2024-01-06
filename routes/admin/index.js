import { Router } from "express";
import dashboard from "./dashboard.js";
import login from "./login.js";
import loginHandler from "./loginHandler.js";
import logoutHandler from "./logoutHandler.js";
import protectedRoute from "../../utils/protectedRoute.js";

const router = Router();

router.get("/login", login).post("/login", loginHandler);

router.get("/logout", logoutHandler);

router.get("/dashboard", protectedRoute, dashboard);

export default router;
