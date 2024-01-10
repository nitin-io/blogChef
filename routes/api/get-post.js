import { getPost } from "../../controllers/post.js";

export default async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await getPost(postId);
    return res.json({ post });
  } catch (error) {
    res.status(404).json(error);
  }
};
