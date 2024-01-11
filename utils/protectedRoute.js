import { verifyUser } from "../controllers/user.js";
import csurf from "csurf";

export const csrfProtection = csurf();

export default async (req, res, next) => {
  if (req.session.user && (await verifyUser(req.session.user.email))) {
    return next();
  }

  res.redirect("/admin/login");
};
