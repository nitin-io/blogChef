import { deleteCache } from "../../controllers/cache.js";
import { createPost } from "../../controllers/post.js";

export default async (req, res) => {
  try {
    const post = await createPost(req.body.post);
    await deleteCache("all-posts");
    res.json({ post });
  } catch (error) {
    res.status(401).json(error);
  }
};
