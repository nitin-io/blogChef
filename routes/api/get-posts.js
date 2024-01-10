import { cacheContent } from "../../controllers/cache.js";
import { getAllPosts } from "../../controllers/post.js";

export default async function (req, res) {
  try {
    const posts = await getAllPosts();
    await cacheContent("all-posts", posts);
    return res.json({ posts });
  } catch (error) {
    res.status(404).json(error);
  }
}
