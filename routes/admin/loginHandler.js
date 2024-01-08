import { loginAdmin } from "../../controllers/user.js";

export default async function (req, res) {
  const { email, password } = req.body;
  try {
    const user = await loginAdmin({ email, password });
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      lastLogIn: user.lastLogIn,
    };
    res.redirect("/admin/dashboard");
  } catch {
    res.redirect("/admin/login");
  }
}
