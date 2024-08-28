import express from "express";
import database from "./config/db";
import colors from "colors";
import { userRouter } from "./router/usuarios.router";
import medidorRouter from "./router/medidores.router";
import equiposRouter from "./router/equipos.router";
import obsRouter from "./router/observaciones.router";
import operRouter from "./router/operaciones.router";
import cargaRouter from "./router/carga.router";
import historyRouter from "./router/historial.router";
import moment from "moment";
import { Request } from "express";

async function conectarDB() {
  try {
    await database.authenticate();
    database.sync();
    console.log(colors.green.bold("CONEXION EXITOSA A LA BD"));
  } catch (error) {
    console.log(colors.magenta.bold(`Error al conectar con BD: ${error}`));
  }
}

conectarDB();

const setTimeZone = (req: Request, res, next) => {
  req.dateZone = moment().utcOffset(-5);
  //console.log(req.dateZone);
  next();
};

const server = express();

server.use(setTimeZone);
server.use(express.json());

server.use("/api/usuarios", userRouter);
server.use("/api/medidores", medidorRouter);
server.use("/api/carga", cargaRouter);
server.use("/api/equipos", equiposRouter);
server.use("/api/obs", obsRouter);
server.use("/api/operaciones", operRouter);
server.use("/api/historial", historyRouter);

export default server;
