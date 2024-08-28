import {
  Table,
  Model,
  DataType,
  Column,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Usuario from "./Usuario.model";

@Table({
  tableName: "OPER_EQUIPOS_REF",
  timestamps: false,
})
class EquiposRef extends Model {
  @Column({
    primaryKey: true,
    type: DataType.NUMBER,
    field: "ID",
  })
  declare id: number;

  @ForeignKey(() => Usuario)
  @Column({
    type: DataType.CHAR(6),
    field: "COD_USUARIO",
  })
  cod_usuario!: string;

  @Column({
    type: DataType.DATE,
    field: "FECHA",
  })
  fecha!: Date;

  @Column({
    type: DataType.CHAR(1),
    field: "TURNO",
  })
  turno!: string;

  @Column({
    type: DataType.STRING(10),
    field: "FORMATO",
  })
  formato!: string;

  @Column({
    type: DataType.DATE,
    field: "FECHA_REG",
  })
  fecha_reg!: Date;

  @BelongsTo(() => Usuario)
  user: Usuario;
}

export default EquiposRef;
