export default function (req, res) {
  const { email, password } = req.body;
  if (email === "nitin@google.com" && password === "dounuts") {
    req.session.user = "Nitin Chaudhary";
    res.redirect("/admin/dashboard");
  } else {
    res.redirect("/admin/login");
  }
}
