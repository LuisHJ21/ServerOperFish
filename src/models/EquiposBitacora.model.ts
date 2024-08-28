import {
  Table,
  Model,
  DataType,
  Column,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import EquiposRef from "./EquiposRef.model";
import EquiposLista from "./EquiposLista.model";
@Table({
  tableName: "OPER_EQUIPOS_REF_BITACORA",
  timestamps: false,
})
class EquiposBitacora extends Model {
  @ForeignKey(() => EquiposRef)
  @Column({
    primaryKey: true,
    type: DataType.NUMBER,
    field: "ID",
  })
  declare id: number;

  @Column({
    type: DataType.DATE,
    field: "HORA",
  })
  hora!: Date;

  @ForeignKey(() => EquiposLista)
  @Column({
    type: DataType.CHAR(8),
    field: "COD_MAQ",
  })
  cod_maq!: string;

  @Column({
    type: DataType.STRING(200),
    field: "OBSERVA",
  })
  observa!: string;

  @BelongsTo(() => EquiposRef)
  equipo!: EquiposRef;

  @BelongsTo(() => EquiposLista)
  lista!: EquiposLista;
}

export default EquiposBitacora;
