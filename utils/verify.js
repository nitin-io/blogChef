import { verifyToken } from "../controllers/user.js";

export default (req, res) => {
  try {
    const { token } = req.body;
    verifyToken(token);
    res.json({ status: true });
  } catch (error) {
    res.status(403).json(error);
  }
};
