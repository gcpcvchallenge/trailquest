import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Servir le build Vite
app.use(express.static(path.join(__dirname, "dist/public")));

// Exemple d'API
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

// Fallback SPA
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/public/index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
