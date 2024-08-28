import { Table, Model, DataType, Column } from "sequelize-typescript";

@Table({
  tableName: "OPER_EQUIPOS_UBICACIONES",
  timestamps: false,
})
class EquiposUbicaciones extends Model {
  @Column({
    type: DataType.CHAR(3),
    field: "COD",
  })
  cod!: string;

  @Column({
    type: DataType.STRING(20),
    field: "DENOM",
  })
  denom!: string;

  @Column({
    type: DataType.DATE,
    field: "FECHA_MOD",
  })
  fecha_mod!: Date;
}

export default EquiposUbicaciones;
