import { deleteCache } from "../../controllers/cache.js";
import { deletePost } from "../../controllers/post.js";

export default async (req, res) => {
  try {
    const { postId } = req.params;

    const deletedPost = await deletePost(postId);
    await deleteCache([`post:${postId}`, "all-posts"]);
    return res.json(deletedPost);
  } catch (error) {
    res.status(404).json(error);
  }
};
