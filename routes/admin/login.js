export default function (req, res) {
  if (req.session.user) {
    return res.redirect("/admin/dashboard");
  }
  res.render("login", { csrfToken: req.csrfToken() });
}
