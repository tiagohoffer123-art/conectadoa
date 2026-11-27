import "dotenv/config";
import express from "express";
import db from "./db.js";

const app = express();
app.use(express.json());

app.get("/api/health", async (req, res) => {
  const hora = new Date().toISOString();
  try {
    await db.execute("SELECT 1");
    res.json({ status: "ok", app: "ConectaDoa", banco: "ok", hora });
  } catch {
    res.status(500).json({ status: "ok", app: "ConectaDoa", banco: "erro", hora });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
