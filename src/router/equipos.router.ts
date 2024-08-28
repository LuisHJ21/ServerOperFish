import { Router } from "express";
import cors from "cors";
import { getEquipos } from "../handler/equipos";

const equiposRouter = Router();

equiposRouter.use(cors());

// Configurar CORS manualmente si es necesario
equiposRouter.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

equiposRouter.get("/", getEquipos);

export default equiposRouter;
