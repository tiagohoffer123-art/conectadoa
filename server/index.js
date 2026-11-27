import "dotenv/config";
import express from "express";
import db from "./db.js";
import doadores from "./routes/doadores.js";
import itens from "./routes/itens.js";
import doacoes from "./routes/doacoes.js";

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

app.use("/api/doadores", doadores);
app.use("/api/itens", itens);
app.use("/api/doacoes", doacoes);

// Tratador de erros: qualquer erro não tratado vira 500
app.use((err, req, res, _next) => {
  console.error(err);
  res.status(500).json({ erro: "Erro interno do servidor" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
