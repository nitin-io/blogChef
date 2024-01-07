export default (req, res) => {
  const { id, title, content } = req.body;
  console.table({ id, title, content });
  res.json({ id, title, content });
};
