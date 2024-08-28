import { Table, Model, DataType, Column } from "sequelize-typescript";

@Table({
  tableName: "OPER_EQUIPOS_REF_MEDIDOR",
  timestamps: false,
})
class EquipoMedidor extends Model {
  @Column({
    primaryKey: true,
    type: DataType.NUMBER,
    field: "ID",
  })
  declare id: number;

  @Column({
    type: DataType.CHAR(2),
    field: "COD_UBIC",
  })
  cod_ubic!: string;

  @Column({
    type: DataType.NUMBER,
    field: "LECTURA",
  })
  lectura!: number;

  @Column({
    type: DataType.DATE,
    field: "HORA",
  })
  hora!: Date;
}

export default EquipoMedidor;
