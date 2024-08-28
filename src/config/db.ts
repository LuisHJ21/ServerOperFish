import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import oracledb from "oracledb";

dotenv.config();

oracledb.initOracleClient();
const bd = process.env.DATABASE;
const usr = process.env.USERDB;
const pass = process.env.PASSDB;

const database = new Sequelize({
  logging: false,
  username: usr,
  password: pass,
  dialect: "oracle",
  dialectOptions: {
    connectString:
      "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=192.168.10.4)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=orcl.fisholg)))",
  },
  models: [__dirname + "/../models/**/*.model.*"],
});

export default database;
