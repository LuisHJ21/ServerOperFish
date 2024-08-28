import { Table, Model, DataType, Column } from "sequelize-typescript";

@Table({
  tableName: "TT_OPER_ULTIMOS_CARGA",
  timestamps: false,
})
class TTCarga extends Model {
  @Column({
    type: DataType.STRING(10),
    field: "ITEM",
  })
  item!: string;

  @Column({
    type: DataType.STRING(10),
    field: "PROCESO",
  })
  proceso!: string;

  @Column({
    type: DataType.STRING(5),
    field: "HORA",
  })
  hora!: Date;

  @Column({
    type: DataType.STRING(10),
    field: "PESO",
  })
  peso!: number;
}

export default TTCarga;
