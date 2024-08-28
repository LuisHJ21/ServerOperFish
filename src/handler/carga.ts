import { Request, Response } from "express";
import PlacaTunelRefDt from "../models/PlacaTunRefDt.model";
import EquiposRef from "../models/EquiposRef.model";
import PlacaTunList from "../models/PlacaTunList.model";
import TTCarga from "../models/TTCarga.model";
import { Sequelize } from "sequelize";
import database from "../config/db";
import sequelize from "sequelize";
import EquiposBitacora from "../models/EquiposBitacora.model";

const updUltimaCarga = async (turno: string, fecha: string) => {
  try {
    const query = `
    BEGIN
      usp_operaciones_ultimos_carga(:as_turno, :as_fecha);
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

export const getHistoryCarga = async (req: Request, res: Response) => {
  try {
    const { turno, fecha } = req.body;

    await updUltimaCarga(turno, fecha);

    const historial = await PlacaTunelRefDt.findAll({
      attributes: {
        exclude: ["id", "hora"],
        include: [
          [
            Sequelize.literal(
              "decode(proceso,'1','Start','2','Defrost','Stop')"
            ),
            "proceso_txt",
          ],
          [Sequelize.literal("to_char(hora, 'HH24:MI')"), "hora"],
        ],
      },
      include: [
        {
          model: EquiposRef,
          attributes: ["TURNO"],
          where: {
            TURNO: turno,
            FECHA: fecha,
          },
        },
        {
          model: PlacaTunList,
          attributes: {
            exclude: ["id"],

            //include: ["DENOM"],
          },
        },
      ],
      order: [["HORA", "DESC"]],
    });

    const ultimos = await TTCarga.findAll({
      attributes: {
        exclude: ["id"],
      },
    });

    return res.json({ data: { historial: historial, ult: ultimos } });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getPlaTun = async (req: Request, res: Response) => {
  try {
    const lista = await PlacaTunList.findAll({
      attributes: {
        exclude: ["id"],
      },
    });

    return res.json({ data: lista });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const saveCarga = async (req: Request, res: Response) => {
  try {
    const { item, proceso, peso, id, obs } = req.body;
    let obsPT = "";

    const carga = await PlacaTunelRefDt.create({
      id: id,
      cod_item: item,
      proceso: proceso,
      obs: obs,
      peso: peso,
    });

    if (!carga) {
      return res.status(400).json({ error: "NO SE HA GUARDADO LA CARGA" });
    }

    if (obs !== null && obs.trim().length > 0 && obs !== undefined) {
      const searchMaq = await PlacaTunList.findOne({
        attributes: ["COD_MAQ", "DENOM"],
        where: {
          cod_item: item,
        },
      });

      if (!searchMaq) {
        return res
          .status(201)
          .json({ data: "NO SE HA PODIDO UBICAR LA MAQUINA" });
      }

      console.log(searchMaq, searchMaq.get("COD_MAQ"));

      if (
        searchMaq.get("COD_MAQ") == "01011000" ||
        searchMaq.get("COD_MAQ") == "01015500"
      ) {
        obsPT = searchMaq.get("DENOM") + `: ${obs} `;
      } else {
        obsPT = obs;
      }

      const observacion = await EquiposBitacora.create({
        id: id,
        cod_maq: searchMaq.get("COD_MAQ"),
        observa: obsPT,
      });

      if (!observacion) {
        return res.status(201).json({ data: "NO SE HA GUARDADO LA BITACORA" });
      }

      return res.json({ data: "GUARDADO EXITOSO" });
    } else {
      return res.json({ data: "GUARDADO EXITOSO" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
