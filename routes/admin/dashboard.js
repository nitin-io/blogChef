import { getFlaggedPosts } from "../../controllers/post.js";

export default async (req, res) => {
  const flaggedPosts = await getFlaggedPosts();
  res.render("dashboard", {
    user: req.session.user.name,
    lastLogIn: req.session.user.lastLogIn,
    posts: flaggedPosts,
  });
};
