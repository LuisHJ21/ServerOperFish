import { Router } from "express";
import cors from "cors";
import {
  FindOrCreateOper,
  getHorometro,
  getOper,
  saveOper,
} from "../handler/operaciones";

const operRouter = Router();

operRouter.use(cors());

// Configurar CORS manualmente si es necesario
operRouter.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

operRouter.post("/", saveOper);
operRouter.get("/horometro/:oper/:maq/:comp", getHorometro);
operRouter.post("/historial", getOper);

operRouter.post("/search", FindOrCreateOper);

export default operRouter;
