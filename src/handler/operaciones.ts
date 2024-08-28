import EquipoRefDt from "../models/EquipoRefDt.model";
import { Request, Response } from "express";
import EquiposRef from "../models/EquiposRef.model";
import EquiposLista from "../models/EquiposLista.model";
import TTOperUlt from "../models/TTOperUlt.model";
import { Sequelize } from "sequelize";
import database from "../config/db";
import sequelize from "sequelize";
import moment from "moment";
import EquiposBitacora from "../models/EquiposBitacora.model";

const updUltOper = async (turno: string, fecha: string) => {
  try {
    const query = `
    BEGIN
      usp_operaciones_ultimos(:as_turno, :as_fecha);
    END;
  `;

    const result = await database.query(query, {
      replacements: {
        as_turno: turno,
        as_fecha: fecha,
      },
      type: sequelize.QueryTypes.RAW,
    });

    return result;
  } catch (error) {}
};

export const getOper = async (req: Request, res: Response) => {
  try {
    const { turno, fecha } = req.body;

    await updUltOper(turno, fecha);

    const operaciones = await EquipoRefDt.findAll({
      attributes: {
        exclude: ["hora", "hora_reg"],
        include: [
          [Sequelize.literal(`TO_CHAR(hora, 'HH24:MI')`), "hora"],
          [
            Sequelize.literal(`TO_CHAR(hora_reg, 'DD/MM/YYYY HH24:MI:ss')`),
            "hora_reg",
          ],
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
          model: EquiposLista,
          attributes: ["DENOM"],
        },
      ],
      order: [
        ["HORA", "DESC"],
        ["COD_MAQUINA", "ASC"],
        ["COMPRESOR", "ASC"],
      ],
    });

    const ultOper = await TTOperUlt.findAll({
      attributes: {
        exclude: ["id", "horalrg"],
        include: [
          [
            Sequelize.literal(`TO_CHAR(horalrg, 'DD/MM/YYYY HH24:MI:ss')`),
            "horalrg",
          ],
        ],
      },
      order: [
        ["HORALRG", "DESC"],
        ["MAQUINA", "ASC"],
        ["COMPRESOR", "ASC"],
      ],
    });

    return res.json({ data: { oper: operaciones, ultoper: ultOper } });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const FindOrCreateOper = async (req: Request, res: Response) => {
  try {
    const { turno, fecha, username } = req.body;
    const [oper, create] = await EquiposRef.findOrCreate({
      where: {
        turno: turno,
        fecha: fecha,
        cod_usuario: username,
      },
      defaults: {
        id: "",
        fecha: moment(fecha, "YYYY-MM-DD").toDate(),
      },
    });

    if (create) {
      const oper = await EquiposRef.findOne({
        where: {
          turno: turno,
          fecha: fecha,
          cod_usuario: username,
        },
      });

      return res.json({ data: oper });
    } else {
      return res.json({ data: oper });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getHorometro = async (req: Request, res: Response) => {
  try {
    const { oper, maq, comp } = req.params;
    const result = await database.query(
      "select get_horometro(:numOper,:maq,:comp) HOROMETRO from dual",
      {
        replacements: { numOper: oper, maq: maq, comp: comp },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    return res.json({ data: result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const saveOper = async (req: Request, res: Response) => {
  try {
    const {
      id,
      equipo,
      horom,
      compres,
      presAlta,
      presBaja,
      amperaje,
      aceiptePres,
      aceiteNvl,
      ambienteTemp,
      aceiteTemp,
      ambienteTemp1,
      aceiteTemp1,
      obs,
    } = req.body;

    const operacion = await EquipoRefDt.create({
      id: id,
      cod_maquina: equipo,
      compresor: compres,
      pres_alta: presAlta,
      pres_baja: presBaja,
      pres_aceite: aceiptePres,
      amperaje: amperaje,
      nivel_aceite: aceiteNvl,
      temp_aceite: aceiteTemp,
      temp_aceite1: aceiteTemp1,
      temp_amb: ambienteTemp,
      temp_amb1: ambienteTemp1,
      horometro: horom,
      hora: moment().toDate(),
      hora_reg: moment().toDate(),
    });

    if (!operacion) {
      return res.status(400).json({ error: "NO SE HA GUARDADO LA OPERACIÓN" });
    }

    if (obs !== null && obs.trim().length > 0 && obs !== undefined) {
      const observacion = await EquiposBitacora.create({
        id: id,
        cod_maq: equipo,
        observa: obs,
      });

      if (!observacion) {
        return res.status(201).json({ data: "NO SE HA GUARDADO LA BITACORA" });
      }

      return res.json({ data: "GUARDADO EXITOSO" });
    } else {
      return res.json({ data: "GUARDADO EXITOSO" });
    }
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
