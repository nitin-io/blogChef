export default (req, res) => {
  const { postId } = req.params;
  return res.send(`Post ${postId}`);
};
