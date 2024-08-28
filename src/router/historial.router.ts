import { Router } from "express";
import { getHistory } from "../handler/historial";
import cors from "cors";

const historyRouter = Router();

historyRouter.use(cors());

// Configurar CORS manualmente si es necesario
historyRouter.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

historyRouter.get("/:mes/:anio", getHistory);

export default historyRouter;
