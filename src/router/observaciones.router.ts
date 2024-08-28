import { Router } from "express";
import cors from "cors";
import { getObservaciones, saveObservacion } from "../handler/observaciones";

const obsRouter = Router();

obsRouter.use(cors());

// Configurar CORS manualmente si es necesario
obsRouter.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

obsRouter.post("/", saveObservacion);
obsRouter.post("/historial", getObservaciones);

export default obsRouter;
