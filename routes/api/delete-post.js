import { deletePost } from "../../controllers/post.js";

export default async (req, res) => {
  try {
    const { postId } = req.params;

    const deletedPost = await deletePost(postId);

    return res.json(deletedPost);
  } catch (error) {
    res.status(404).json(error);
  }
};
