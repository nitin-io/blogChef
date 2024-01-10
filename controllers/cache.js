import redisClient from "../cache/index.js";

export const cacheContent = (key, content, expiry = 120) =>
  redisClient.set(key, JSON.stringify(content), "EX", expiry);

export const deleteCache = (key) => {
  if (Array.isArray(key)) {
    return key.forEach((k) => redisClient.del(k));
  }

  return redisClient.del(key);
};

export const servePostsFromCache = async (req, res, next) => {
  const posts = await redisClient.get("all-posts");

  if (posts) {
    return res.json({ posts: JSON.parse(posts) });
  }
  next();
};

export const servePostFromCache = async (req, res, next) => {
  const post = await redisClient.get(`post:${req.params.postId}`);
  return post ? res.json({ post: JSON.parse(post) }) : next();
};
