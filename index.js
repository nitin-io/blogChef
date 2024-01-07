import express from "express";
import session from "express-session";
import homeRoute from "./routes/home/index.js";
import adminRoutes from "./routes/admin/index.js";
import apiRoutes from "./routes/api/index.js";
import connectDB from "./db/index.js";

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

app.use("/", homeRoute);
app.use("/admin", adminRoutes);
app.use("/api", apiRoutes);

Promise.all([connectDB(process.env.ATLAS_CONN_URI)])
  .then(() => {
    app.listen(3000, () => {
      console.log("Server Running on Port 3000...");
    });
  })
  .catch((error) => {
    console.log(`Atlas Connection Error: ${error}`);
    process.exit();
  });
