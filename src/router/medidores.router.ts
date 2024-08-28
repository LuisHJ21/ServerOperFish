import { Router } from "express";
import {
  getHistory,
  getUltDato,
  getUbicaciones,
  saveLectura,
} from "../handler/medidores";
import cors from "cors";

const medidorRouter = Router();

medidorRouter.use(cors());

// Configurar CORS manualmente si es necesario
medidorRouter.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

medidorRouter.post("/", saveLectura);
medidorRouter.post("/historial", getHistory);
medidorRouter.get("/ubicaciones", getUbicaciones);

medidorRouter.get("/:codigo", getUltDato);

export default medidorRouter;
