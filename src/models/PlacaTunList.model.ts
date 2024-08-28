import { Table, Model, DataType, Column } from "sequelize-typescript";

//oper_equipos_item_placatunel
@Table({
  tableName: "OPER_EQUIPOS_ITEM_PLACATUNEL",
  timestamps: false,
})
class PlacaTunList extends Model {
  @Column({
    primaryKey: true,
    type: DataType.CHAR(3),
    field: "COD_ITEM",
  })
  cod_item!: string;

  @Column({
    type: DataType.STRING(10),
    field: "DENOM",
  })
  denom!: string;

  @Column({
    type: DataType.CHAR(8),
    field: "COD_MAQ",
  })
  cod_maq!: string;
}

export default PlacaTunList;
