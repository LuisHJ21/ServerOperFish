import { Router } from "express";
import { Loggin } from "../handler/usuario";
import cors from "cors";

export const userRouter = Router();

userRouter.use(cors());

// Configurar CORS manualmente si es necesario
userRouter.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

userRouter.get("/", (req, res) => {
  res.json("CONSULTA POST");
});

userRouter.post("/login", Loggin);
