import express from "express";
import session from "express-session";
import protectedRoute from "./utils/protectedRoute.js";

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  "/admin",
  session({
    name: "sessId",
    resave: false,
    saveUninitialized: true,
    secret:
      app.get("env") === "development"
        ? "thisIsASecretKey"
        : process.env.SESSION_SECRET,
    cookie: {
      httpOnly: true,
      maxAge: 18000000,
      secure: app.get("env") === "production",
    },
  })
);

app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index");
});

app
  .get("/admin/login", (req, res) => {
    res.render("index");
  })
  .post("/admin/login", (req, res) => {
    const { email, password } = req.body;
    if (email === "nitin@google.com" && password === "password") {
      console.log(req.session);
      req.session.user = "Nitin Chaudhary";
      res.redirect("/admin/dashboard");
    } else {
      res.status(400).redirect("/admin/login");
    }
  });

app
  .get("/admin/dashboard", protectedRoute, (req, res) => {
    res.render("dashboard", {
      user: req.session.user,
      posts: [
        {
          id: 1,
          author: "Joe Mockery",
          title: "Express is awesome!",
          content: "Express is awesome framework, have you tried it?",
        },
        {
          id: 2,
          author: "John Doe",
          title: "Pug is awesome template engine",
          content: "Pug is remarkable when it comes to generate html code",
        },
      ],
    });
  })
  .get("/admin/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/admin/login");
  });

app.listen(3000, () => {
  console.log("Server Running on Port 3000...");
});
