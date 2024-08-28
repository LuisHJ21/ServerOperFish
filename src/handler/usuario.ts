import { Request, Response } from "express";
import Usuario from "../models/Usuario.model";
import database from "../config/db";

type ServerTimeResult = {
  SERVER_TIME: string;
};

export const Loggin = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const username = data["username"];
    const pass = data["pass"];

    const usuario = await Usuario.findAll({
      attributes: ["COD_USR", "NOMBRE", "CLAVE", "PERFIL"],
      where: {
        COD_USR: username.toLowerCase(),
        FLAG_ESTADO: "1",
      },
    });

    if (!usuario || usuario.length === 0) {
      return res.status(404).json({ error: "USUARIO NO EXISTE O INACTIVO" });
    }

    const passBD = usuario[0].get("CLAVE") as string;
    const userBD = usuario[0].get("COD_USR") as string;
    const nameBD = usuario[0].get("NOMBRE") as string;
    const profileBD = usuario[0].get("PERFIL") as string;
    const nameAdm =
      profileBD.trim() === "DEVELOP" || profileBD.trim() === "SUPERMNT"
        ? nameBD
        : ("" as string);

    if (pass !== Decrypt(passBD)) {
      return res.status(400).json({ error: "CLAVE INCORRECTA" });
    }

    const [result, metadata] = (await database.query(
      "SELECT TO_CHAR(SYSDATE, 'HH24MI') AS SERVER_TIME FROM dual"
    )) as [ServerTimeResult[], any];

    const serverTime = result[0].SERVER_TIME;
    const valorTime = parseInt(serverTime);

    let turno = "";
    let fecha = req.dateZone;
    // let fecExp = new Date(fecha.setHours(fecha.getHours() + 8));

    if (valorTime >= 800 && valorTime < 2000) {
      turno = "1";
    } else {
      turno = "2";
      // verifico si la hora en que me registro es más de las 12 y menor a 6
      // si es así debe tomar la fecha del día anterior pero el TURNO NOCHE
      if (valorTime >= 0 && valorTime < 800) {
        fecha.subtract(1, "days");
      }
    }

    /* const year = fecha.getFullYear();
    const month = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const day = fecha.getDate().toString().padStart(2, "0"); */

    // const fechaString = `${year}-${month}-${day}`;

    return res.json({
      data: {
        username: userBD,
        nombre: nameBD,
        perfil: profileBD,
        turno: turno,
        fecha: fecha.format("YYYY-MM-DD"),
        nombreAdm: nameAdm,
        hora: fecha.format("HH:mm:ss"),
        // fecExp: fecExp,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const Decrypt = (encrypted: string): string => {
  const key = "SigreEsUnaFilosofiaDeVidaSigreEsUnaFilosofiaDeVida";
  const encryptedValue = encrypted;

  const encryptedLength = encryptedValue.length;
  const keyLength = key.length;
  let original = "";
  let keyIndex = 0;

  for (let origIndex = 0; origIndex < encryptedLength; origIndex += 3) {
    const keyTemp = key.charCodeAt(keyIndex);
    let work = parseInt(encryptedValue.substr(origIndex, 3));

    work = work - keyTemp;

    while (work < 0) {
      if (work < 0) {
        work = work + 255;
      }
    }

    const tempChar = String.fromCharCode(work);
    original = original + tempChar;
    keyIndex = keyIndex + 1;
    if (keyIndex >= keyLength) {
      keyIndex = 0;
    }
  }

  return original;
};
