import { Request, Response } from "express";
import TTMedidores from "../models/TTMedidores.model";
import EquiposUbicaciones from "../models/EquiposUbicaciones.model";
import { Sequelize } from "sequelize";
import database from "../config/db";
import sequelize from "sequelize";
import EquipoMedidor from "../models/EquipoMedidor.model";

const updUltimosMedidores = async (turno: string, fecha: string) => {
  try {
    const query = `
    BEGIN
      usp_operaciones_med(:as_turno, :as_fecha);
    END;
  `;

    const result = await database.query(query, {
      replacements: {
        as_turno: turno,
        as_fecha: fecha,
      },
      type: sequelize.QueryTypes.RAW, // Tipo de consulta cruda
    });

    return result;
  } catch (error) {}
};
export const getHistory = async (req: Request, res: Response) => {
  try {
    const { turno, fecha } = req.body;
    await updUltimosMedidores(turno, fecha);
    const historial = await TTMedidores.findAll({
      attributes: {
        exclude: ["id", "ulthora", "anthora"],
        include: [
          "cod",
          "descrip",
          [
            Sequelize.literal(`TO_CHAR(anthora, 'DD/MM/YYYY HH24:MI')`),
            "anthora",
          ],
          "antdato",
          [
            Sequelize.literal(`TO_CHAR(ulthora, 'DD/MM/YYYY HH24:MI')`),
            "ulthora",
          ],
          "ultdato",
          [
            Sequelize.literal(`TRIM(TO_CHAR(ultdato - antdato,'999990.9'))`),
            "diferencia",
          ],
        ],
      },
      order: [[Sequelize.literal('CAST("COD" AS INTEGER)'), "ASC"]],
    });

    res.json({ data: historial });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getUltDato = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.params;

    const dato = await TTMedidores.findOne({
      attributes: {
        exclude: ["id", "ulthora", "anthora", "antdato"],
        /*   include: ["cod", "ultdato"], */
      },
      where: { cod: codigo },
      order: [[Sequelize.literal('CAST("COD" AS INTEGER)'), "ASC"]],
    });

    if (!dato) {
      return res.status(404).json({ error: "UBICACIÓN NO ENCONTRADA" });
    }

    return res.json({ data: dato });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getUbicaciones = async (req: Request, res: Response) => {
  try {
    const ubicaciones = await EquiposUbicaciones.findAll({
      attributes: {
        exclude: ["id"],
      },
      order: [[Sequelize.literal('CAST("COD" AS INTEGER)'), "ASC"]],
    });

    res.json({ data: ubicaciones });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const saveLectura = async (req: Request, res: Response) => {
  try {
    const { id, cod, newLectura } = req.body;
    const medidor = await EquipoMedidor.create({
      id: id,
      cod_ubic: cod,
      lectura: newLectura,
      //hora: null,
    });

    if (!medidor) {
      return res.status(400).json({ error: "NO SE HA GUARDADO LA LECTURA" });
    }

    return res.json({ data: "NUEVA LECTURA REGISTRADA" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
