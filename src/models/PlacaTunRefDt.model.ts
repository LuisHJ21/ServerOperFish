import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import PlacaTunList from "./PlacaTunList.model";
import EquiposRef from "./EquiposRef.model";

//oper_equipos_ref_placatunel_dt
@Table({
  tableName: "OPER_EQUIPOS_REF_PLACATUNEL_DT",
  timestamps: false,
})
class PlacaTunelRefDt extends Model {
  @ForeignKey(() => EquiposRef)
  @Column({
    primaryKey: true,
    type: DataType.NUMBER,
    field: "ID",
  })
  declare id: string;

  @ForeignKey(() => PlacaTunList)
  @Column({
    type: DataType.CHAR(3),
    field: "COD_ITEM",
  })
  cod_item!: string;

  @Column({
    type: DataType.CHAR(1),
    field: "PROCESO",
  })
  proceso!: string;

  @Column({
    type: DataType.DATE,
    field: "HORA",
  })
  hora!: Date;

  @Column({
    type: DataType.NUMBER,
    field: "PESO",
  })
  peso!: string;

  @Column({
    type: DataType.DATE,
    field: "HORA_REG",
  })
  hora_reg!: Date;

  @BelongsTo(() => EquiposRef)
  equipo: EquiposRef;

  @BelongsTo(() => PlacaTunList)
  platun: PlacaTunList;
}

export default PlacaTunelRefDt;
