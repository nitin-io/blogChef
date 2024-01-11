import { check, validationResult } from "express-validator";

export const manageErrors = (cb) => (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  cb(errors.array(), req, res);
};

export const loginUserValidation = [
  check("email")
    .trim()
    .isEmail()
    .notEmpty()
    .withMessage("'Email' is missing or invalid."),
  check("password").notEmpty().withMessage("'password' is empty."),
  manageErrors((errors, req, res) => res.status(422).json({ errors })),
];

export const signupValidation = [
  check("name").trim().escape().notEmpty().withMessage("'name' is empty"),
  check("email")
    .isEmail()
    .notEmpty()
    .withMessage("'email' is missing or invalid"),
  check("password")
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("'password' must have at least 8 characters"),
  manageErrors((errors, req, res) => res.status(422).json({ errors })),
];

export const storePostValidation = [
  check("post.title").notEmpty().withMessage("'title' is empty").escape(),
  check("post.content").notEmpty().withMessage("'content' is empty").escape(),
  check("post.user").notEmpty().withMessage("user is missing").isString(),
  manageErrors((errors, req, res) => {
    console.log(req.body);
    res.status(422).json({ errors });
  }),
];
export const loginAdminValidation = [
  check("email")
    .isEmail()
    .notEmpty()
    .withMessage("'Email' is missing or invalid."),
  check("password").notEmpty().withMessage("'password' is empty."),
  manageErrors((errors, req, res) => res.redirect(req.originalUrl)),
];

export const signupAdminValidation = [
  check("name").trim().escape().notEmpty().withMessage("'name' is empty"),
  check("email")
    .isEmail()
    .notEmpty()
    .withMessage("'email' is missing or invalid"),
  check("password")
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("'password' must have at least 8 characters"),
  manageErrors((errors, req, res) => res.redirect(req.originalUrl)),
];

export const jwtValidation = [
  check("token").isJWT().notEmpty().withMessage("'jwt token' is missing"),
  manageErrors((error, req, res) => res.status(403).json({ error })),
];
