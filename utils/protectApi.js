import { verifyToken } from "../controllers/user.js";

const protectApi = async (req, res, next) => {
  try {
    const authorization = req.header("Authorization");
    if (authorization) {
      // verfiy jwt token
      const token = authorization.split(" ")[1];
      await verifyToken(token);
      return next();
    }

    return res.status(403).json({ message: "Access Unauthorized!" });
  } catch (error) {
    return res.status(403).json(error);
  }
};

export default protectApi;
