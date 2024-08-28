import { Response, Request } from "express";
import { Sequelize } from "sequelize";
import EquiposLista from "../models/EquiposLista.model";

export const getEquipos = async (req: Request, res: Response) => {
  try {
    const equipos = await EquiposLista.findAll({
      attributes: {
        exclude: ["id"],
      },
      where: {
        flag_estado: "1",
      },
      order: [["DENOM", "ASC"]],
    });

    return res.json({ data: equipos });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
