import express from "express";
import session from "./session/index.js";
import homeRoute from "./routes/home/index.js";
import adminRoutes from "./routes/admin/index.js";
import apiRoutes from "./routes/api/index.js";
import connectDB from "./db/index.js";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import helmet from "helmet";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(helmet());
app.use(express.static("public"));
app.use(express.static(join(__dirname, "public", "client")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use("/admin", session(app));

app.set("view engine", "pug");

app.use("/admin", adminRoutes);
app.use("/api", apiRoutes);
app.use("/", homeRoute);

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
