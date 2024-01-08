import User from "../../models/user.js";

export default async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      const user = new User({ name, email, password, isAdmin: true });
      user.save();
      res.redirect("/admin/login");
    }
  } catch {
    res.redirect("/admin/signup");
  }
};
