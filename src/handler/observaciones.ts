import { Request, Response } from "express";
import EquiposBitacora from "../models/EquiposBitacora.model";
import EquiposRef from "../models/EquiposRef.model";
import EquiposLista from "../models/EquiposLista.model";
import { Sequelize } from "sequelize";

export const getObservaciones = async (req: Request, res: Response) => {
  try {
    const { turno, fecha } = req.body;
    const historial = await EquiposBitacora.findAll({
      attributes: {
        exclude: ["hora"],
        include: [[Sequelize.literal(`TO_CHAR(hora, 'HH24:MI')`), "hora"]],
      },
      include: [
        {
          model: EquiposRef,
          // required: true,
          attributes: ["TURNO"],
          where: {
            //ID: sequelize.col("OPER_EQUIPOS_REF.ID"),
            TURNO: turno,
            FECHA: fecha,
          },
        },

        {
          model: EquiposLista,
          required: false,
          attributes: ["DENOM"],
          where: {
            // cod_maq: sequelize.col("OPER_EQUIPOS_LISTA.COD_MAQ"),
          },
        },
      ],
      order: [["hora", "desc"]],
    });

    return res.json({ data: historial });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const saveObservacion = async (req: Request, res: Response) => {
  try {
    const { id, equipo, obs } = req.body;
    const observacion = await EquiposBitacora.create({
      id: id,
      cod_maq: equipo,
      observa: obs,
    });

    if (!observacion) {
      return res
        .status(400)
        .json({ error: "NO SE HA GUARDADO LA OBSERVACION" });
    }

    return res.json({ data: "OBSERVACION REGISTRADA" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
