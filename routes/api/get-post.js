import { cacheContent } from "../../controllers/cache.js";
import { getPost } from "../../controllers/post.js";

export default async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await getPost(postId);
    cacheContent(`post:${postId}`, post);
    return res.json({ post });
  } catch (error) {
    res.status(404).json(error);
  }
};
