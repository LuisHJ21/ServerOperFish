import colors from "colors";
import server from "./server";
import dotenv from "dotenv";

dotenv.config();

const puerto = process.env.PORT;

server.listen(puerto, () => {
  console.log(colors.cyan.bold(`SERVER CORRIENDO EN PUERTO ${puerto}`));
});
