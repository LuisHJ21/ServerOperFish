import { Request, Response } from "express";
import Usuario from "../models/Usuario.model";
import EquiposRef from "../models/EquiposRef.model";
import { Sequelize } from "sequelize-typescript";
import { Op } from "sequelize";

export const getHistory = async (req: Request, res: Response) => {
  try {
    const { mes, anio } = req.params;

    const historial = await EquiposRef.findAll({
      attributes: {
        exclude: ["formato", "fecha", "fecha_reg"],
        include: [
          [Sequelize.literal(`TO_CHAR(fecha, 'YYYY-MM-DD')`), "fecha"],
          [
            Sequelize.literal(`TO_CHAR(fecha_reg, 'DD/MM/YYYY HH24:MI')`),
            "fecha_reg",
          ],
        ],
      },

      include: [
        {
          model: Usuario,
          attributes: ["COD_USR", "NOMBRE"],
        },
      ],

      where: {
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn("TO_CHAR", Sequelize.col("FECHA"), "YYYY"),
            anio
          ),
          Sequelize.where(
            Sequelize.fn("TO_CHAR", Sequelize.col("FECHA"), "MM"),
            mes
          ),
        ],
      },
      order: [["ID", "DESC"]],
    });

    if (!historial || historial.length === 0) {
      return res.status(404).json({ error: "NO SE HAN ENCONTRADO DATOS" });
    }

    return res.json({ data: historial });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
