import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Mimic the Python Scikit-Learn Model for the preview
  app.post("/predict", (req, res) => {
    const { cpu_ghz, ram_gb, storage_gb, gpu_rank } = req.body;
    
    // This formula mimics the logic in model_train.py:
    // price = (200 + cpu * 100 + ram * 10 + storage * 0.15 + gpu * 250)
    try {
      const basePrice = 200;
      const cpuContrib = (cpu_ghz || 0) * 100;
      const ramContrib = (ram_gb || 0) * 10;
      const storageContrib = (storage_gb || 0) * 0.15;
      const gpuContrib = (gpu_rank || 0) * 250;
      
      const totalPrice = basePrice + cpuContrib + ramContrib + storageContrib + gpuContrib;
      
      res.json({
        prediction: `$${Math.max(0, totalPrice).toFixed(2)}`,
        confidence: 0.95
      });
    } catch (e) {
      res.status(500).json({ error: "Prediction service error" });
    }
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ByteLink Node Bridge Active" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
