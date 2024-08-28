import { Router } from "express";
import cors from "cors";
import { getHistoryCarga, getPlaTun, saveCarga } from "../handler/carga";

const cargaRouter = Router();

cargaRouter.use(cors());

// Configurar CORS manualmente si es necesario
cargaRouter.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

cargaRouter.get("/", getPlaTun);
cargaRouter.post("/", saveCarga);
cargaRouter.post("/historial", getHistoryCarga);

export default cargaRouter;
