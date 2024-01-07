import { fileURLToPath } from "url";
import { join, dirname } from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));

export default function (req, res) {
  return res.sendFile(
    join(__dirname, "../../", "public", "client", "index.html")
  );
}
