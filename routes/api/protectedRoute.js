export default (req, res, next) => {
  const authorization = req.header("Authorization");
  if (authorization) {
    // JWT token check here
    return next();
  }

  res.status(400).json({ error: { code: 400, message: "Unauthorized!" } });
};
