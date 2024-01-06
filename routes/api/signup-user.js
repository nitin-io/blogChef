export default function (req, res) {
  const { email, password } = req.body;
  res.json({ status: true });
}
