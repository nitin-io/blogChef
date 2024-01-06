export default function (req, res) {
  req.session.destroy();
  res.redirect("/");
}
