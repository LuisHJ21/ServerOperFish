import {
  Table,
  Model,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import EquiposRef from "./EquiposRef.model";
import EquiposLista from "./EquiposLista.model";

@Table({
  tableName: "OPER_EQUIPOS_REF_EQUIPO_DT",
  timestamps: false,
})
class EquipoRefDt extends Model {
  @ForeignKey(() => EquiposRef)
  @Column({
    primaryKey: true,
    type: DataType.NUMBER,
    field: "ID",
  })
  declare id: number;

  @ForeignKey(() => EquiposLista)
  @Column({
    type: DataType.CHAR(8),
    field: "COD_MAQUINA",
  })
  cod_maquina!: string;

  @Column({
    type: DataType.CHAR(2),
    field: "COMPRESOR",
  })
  compresor: string;

  @Column({
    type: DataType.DATE,
    field: "HORA",
  })
  hora!: Date;

  @Column({
    type: DataType.NUMBER,
    field: "PRES_ALTA",
  })
  pres_alta!: number;

  @Column({
    type: DataType.NUMBER,
    field: "PRES_BAJA",
  })
  pres_baja!: number;

  @Column({
    type: DataType.NUMBER,
    field: "PRES_ACEITE",
  })
  pres_aceite!: number;

  @Column({
    type: DataType.NUMBER,
    field: "AMPERAJE",
  })
  amperaje!: number;

  @Column({
    type: DataType.STRING(3),
    field: "NIVEL_ACEITE",
  })
  nivel_aceite!: string;

  @Column({
    type: DataType.NUMBER,
    field: "TEMP_ACEITE",
  })
  temp_aceite!: number;

  @Column({
    type: DataType.NUMBER,
    field: "TEMP_ACEITE1",
  })
  temp_aceite1!: number;

  @Column({
    type: DataType.NUMBER,
    field: "TEMP_AMB",
  })
  temp_amb!: number;

  @Column({
    type: DataType.NUMBER,
    field: "TEMP_AMB1",
  })
  temp_amb1!: number;

  @Column({
    type: DataType.DATE,
    field: "HORA_REG",
  })
  hora_reg!: Date;

  @Column({
    type: DataType.NUMBER,
    field: "HOROMETRO",
  })
  horometro!: number;

  @BelongsTo(() => EquiposRef)
  equipo: EquiposRef;
  @BelongsTo(() => EquiposLista)
  lista!: EquiposLista;
}

export default EquipoRefDt;
